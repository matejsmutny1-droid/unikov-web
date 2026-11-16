# Odovzdanie a nasadenie

## Čo odovzdať

Tento celý repozitár obsahuje zdrojové súbory, fotografie a predgenerovaný web. Na hosting sa kopíruje **obsah adresára `dist/`**. Inštalácia balíčkov, databáza ani účet na náhľadovom hostingu nie sú potrebné.

## Lokálny náhľad

Potrebný je Node.js 18 alebo novší:

```sh
npm start
```

Otvorte http://127.0.0.1:4173. Bez Node.js môžete použiť `python3 -m http.server 4173 --directory dist`.

## Úpravy

- `dist/app.js`: texty, technické parametre, stránky a interakcie.
- `dist/style.css`: dizajn, responzivita a farebný grading fotografií.
- `dist/assets/`: všetky pôvodné fotografie a ikona webu.
- `build.mjs`: predgenerovanie HTML všetkých podstránok a kontrola odkazov.

Po úprave obsahu spustite:

```sh
npm run check
```

## Produkčný hosting

Web môže fungovať na bežnom statickom hostingu (Apache, Nginx, Cloudflare Pages, Netlify, Vercel a ďalšie). Nahrajte obsah `dist/` do koreňa webovej domény. Pri službách s build nastavením použite príkaz `npm run build` a výstupný adresár `dist`.

Súbory už obsahujú jednotlivé podstránky a zodpovedajúce pôvodné URL. Nejde o web určený na vloženie do podadresára; pre adresu typu `example.com/unikov/` by sa museli upraviť absolútne odkazy na súbory a stránky.

## Kontaktný formulár

Formulár pripravuje e-mail cez `mailto:`. Otvára e-mailového klienta návštevníka. Nefunguje ako serverové odosielanie a nič neukladá. Prílohy pridá návštevník až v e-mailovej aplikácii. Pri požiadavke na automatické serverové odosielanie je potrebné doplniť zvolenú e-mailovú službu alebo backend.

## Pred nahradením firemného webu

S firmou potvrďte aktuálne kontakty, bankové spojenie, personálne a strojové kapacity, technické parametre a stav certifikácie. Obsah bol prevzatý zo súčasného starého webu a niektoré údaje môžu byť historické. Pôvodná nemecká verzia je zachovaná ako externý odkaz DE. Texty a fotografie firmy boli prevzaté na účel návrhu jej nového webu; tým sa im neprideľuje nová otvorená licencia.

Pri odovzdaní súkromného GitHub repozitára môžete firme poslať ZIP alebo jej pridať prístup cez GitHub. Repozitár neobsahuje prihlasovacie údaje ani hostingovú identitu náhľadovej verzie.
