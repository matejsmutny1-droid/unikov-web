import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import './build.mjs';

const project=path.dirname(fileURLToPath(import.meta.url));
const basePath=(process.env.PAGES_BASE_PATH||'/unikov-web').replace(/\/+$/,'');
if(!/^\/[a-zA-Z0-9_-]+$/.test(basePath))throw new Error('PAGES_BASE_PATH must be one URL path segment.');
const output=path.join(project,'docs');
fs.cpSync(path.join(project,'dist'),output,{recursive:true});
const rewrite=text=>text.replace(/(["'`])\/(?!\/)/g,(_,quote)=>quote+basePath+'/');
function files(directory){return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{const file=path.join(directory,entry.name);return entry.isDirectory()?files(file):[file]})}
let pages=0;
for(const file of files(output)){
 if(!['.html','.js'].includes(path.extname(file)))continue;
 const content=rewrite(fs.readFileSync(file,'utf8'));
 fs.writeFileSync(file,content);
 if(path.extname(file)==='.html'){
  pages++;
  for(const [,url] of content.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)){
   if(!url.startsWith(basePath+'/'))throw new Error('Unprefixed URL: '+url);
   if(!fs.existsSync(path.join(output,url.slice(basePath.length))))throw new Error('Missing Pages target: '+url);
  }
 }
}
fs.writeFileSync(path.join(output,'.nojekyll'),'');
const app=fs.readFileSync(path.join(output,'app.js'),'utf8');
for(const [route,expected] of [['/','Presnosť má'],['/vyrobky/','Každý diel má'],['/vyroba/vyrobne-moznosti/','Možnosti v každom'],['/kontakt/','Dobrý výsledok začína']]){
 const elements=new Map();
 const element=key=>{if(!elements.has(key))elements.set(key,{innerHTML:'',style:{},classList:{toggle(){}},setAttribute(){},removeAttribute(){},addEventListener(){},getAttribute(){return 'false'},focus(){}});return elements.get(key)};
 const document={querySelector:element,querySelectorAll:()=>[],addEventListener(){}};
 vm.runInNewContext(app,{document,location:{pathname:basePath+route,origin:'https://matejsmutny1-droid.github.io'},window:{addEventListener(){},scrollTo(){}},URL,Date,console},{timeout:3000});
 if(!element('#main').innerHTML.includes(expected))throw new Error('Pages routing failed: '+route);
}
console.log(`GitHub Pages: ${pages} HTML files; asset links and routing verified for ${basePath}/.`);
