import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url));
const dist=path.join(base,'dist');
const shell=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const script=fs.readFileSync(path.join(dist,'app.js'),'utf8');
const routes=['/','/o-nas/','/o-nas/o-nas/','/vyrobky/','/vyrobky/vyrobky/','/vyrobky/vlastne-vyrobky/','/vyroba/','/vyroba/vyroba/','/vyroba/vyrobne-moznosti/','/vyroba/fotogaleria/','/vyroba/logistika/','/certifikaty/','/certifikaty/certifikaty/','/certifikaty/certifikaty1/','/certifikaty/fotogaleria1/','/kontakt/','/kontakt/kontakt/','/novinky/','/novinky/novinky/'];
let imageReferences=0;
for(const route of [...routes,'/404.html']){
 const els=new Map();
 const element=key=>{if(!els.has(key))els.set(key,{innerHTML:'',hidden:true,style:{},classList:{toggle(){}},setAttribute(){},removeAttribute(){},addEventListener(){},getAttribute(){return 'false'},focus(){}});return els.get(key)};
 const document={querySelector:element,querySelectorAll:()=>[],addEventListener(){},title:''};
 const context={document,location:{pathname:route,origin:'https://example.com'},window:{addEventListener(){},scrollTo(){}},URL,Date,console};
 vm.runInNewContext(script,context,{timeout:3000});
 let html=shell.replace(/<main id="main">[\s\S]*?<\/main>/,`<main id="main">${element('#main').innerHTML}</main>`).replace(/<footer id="footer">[\s\S]*?<\/footer>/,`<footer id="footer">${element('#footer').innerHTML}</footer>`).replace(/<title>[^<]*<\/title>/,`<title>${document.title}</title>`);
 for(const [,src] of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)){
  const target=path.join(dist,src);
  if(src.startsWith('/assets/')){if(!fs.existsSync(target))throw new Error('Missing asset: '+src);imageReferences++;}
  else if(!['/style.css','/app.js','/'].includes(src)&&!routes.includes(src))throw new Error('Unknown internal link: '+src);
 }
 const dest=route==='/404.html'?path.join(dist,'404.html'):path.join(dist,route,'index.html');
 fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,html);
}
console.log(`Prerendered ${routes.length} routes and 404; verified ${imageReferences} local asset references.`);
