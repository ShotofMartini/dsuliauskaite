# Sanity CMS — paleidimo instrukcija

Šis dokumentas — kas belieka padaryti, kad Deimantė galėtų pati redaguoti svetainės turinį (nuotraukas, serijas, atsiliepimus, spaudos įrašus) be kodo.

Kodo pusė (schemos, integracija, atsarginis (fallback) režimas, perkėlimo skriptas, auto-rebuild) jau paruošta. Liko tik paskyros sukūrimas ir sujungimas.

## 1. Sukurti Sanity paskyrą (turi atlikti Deimantė pati)

Paskyra turi būti **jos vardu**, kad ji galėtų pati valdyti prieigą ir nereikėtų priklausyti nuo kito žmogaus paskyros.

1. Eiti į [sanity.io/manage](https://www.sanity.io/manage) ir užsiregistruoti (gali per Google/GitHub).
2. Paspausti **Create project**. Pavadinimas — pvz. "Deimantė Šuliauskaitė". Planas — **Free**.
3. Dataset pavadinimas: `production`.
4. Nusikopijuoti **Project ID** (rodomas projekto dashboard'e).

## 2. Sujungti projektą lokaliai

```bash
cd studio
npm install
npx sanity login   # atsidarys naršyklė, prisijungti tuo pačiu account'u
```

Sukurti `studio/.env` failą (pagal `studio/.env.example`):
```
SANITY_STUDIO_PROJECT_ID=<gautas Project ID>
SANITY_STUDIO_DATASET=production
```

Paleisti Studio lokaliai patikrinimui:
```bash
npm run dev
```
Atsidarys `localhost:3333` su redagavimo sąsaja.

## 3. Deploy'inti Studio (nuolatinis adresas redagavimui)

```bash
npx sanity deploy
```
Paklaus pasirinkti subdomeną, pvz. `dsuliauskaite` → gausite `https://dsuliauskaite.sanity.studio`. Tai yra adresas, kurį Deimantė naudos turiniui redaguoti — jokio terminalo, jokio kodo, tiesiog prisijungia naršyklėje.

## 4. Perkelti esamą turinį (nuotraukas, serijas, bio)

Reikės laikinai sugeneruoto **write token**:
1. sanity.io/manage → projektas → **API** → **Tokens** → **Add API token**.
2. Pavadinimas: "migration", teisės: **Editor**.
3. Nukopijuoti token (parodomas tik vieną kartą).

Paleisti iš `photographer-portfolio/` šaknies:
```bash
SANITY_PROJECT_ID=<Project ID> SANITY_DATASET=production SANITY_TOKEN=<token> node scripts/migrate-to-sanity.mjs
```

Skriptas perkels 20 esamų nuotraukų, 3 serijas ir "Apie mane" tekstą/foto į Sanity. **Atsiliepimų ir spaudos įrašų sąmoningai neperkelia** — esami yra šabloniniai pavyzdžiai, ne tikras turinys.

Po to **panaikinkite/išjunkite** šį "migration" tokeną sanity.io/manage → API → Tokens (jis daugiau nereikalingas, ir geriau jo nelaikyti).

## 5. Sujungti svetainę su Sanity

Pridėti `.env` faile repo šaknyje (žr. `.env.example`):
```
SANITY_PROJECT_ID=<Project ID>
SANITY_DATASET=production
```

Paleisti `npm run dev` ar `npm run build` — svetainė automatiškai ims duomenis iš Sanity (vietoj statinių failų `src/data/series.ts`).

## 6. GitHub Pages — kad live svetainė taip pat naudotų Sanity

Repo → **Settings → Secrets and variables → Actions → New repository secret**, pridėti:
- `SANITY_PROJECT_ID`
- `SANITY_DATASET` (reikšmė `production`)

## 7. Automatinis rebuild, kai ji paskelbia pakeitimą

Kad pakeitimai Studio'je iškart pasirodytų live svetainėje (GitHub Pages yra statinis — reikia naujo build'o), reikia webhook'o:

1. Sukurti GitHub Personal Access Token: github.com/settings/tokens → **Generate new token (classic)** → scope `repo` → nukopijuoti.
2. sanity.io/manage → projektas → **API → Webhooks → Create webhook**:
   - **URL:** `https://api.github.com/repos/<jūsų-github-vardas>/<repo-pavadinimas>/dispatches`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **HTTP method:** POST
   - **HTTP Headers:**
     - `Authorization: Bearer <GitHub PAT>`
     - `Accept: application/vnd.github+json`
     - `Content-Type: application/json`
   - **Payload (body):** `{"event_type": "sanity-content-updated"}`

Nuo šiol: Deimantė paredaguoja turinį Studio'je → paspaudžia **Publish** → per ~1-2 min GitHub automatiškai perbuildina ir publikuoja svetainę. Pažangą galima sekti repo **Actions** skiltyje.

## Kaip Deimantė redaguos turinį (kai visa tai sutvarkyta)

1. Atsidaro `https://dsuliauskaite.sanity.studio` (arba kitą pasirinktą subdomeną), prisijungia.
2. **Nuotrauka** — naujos nuotraukos: sukurti naują "Nuotrauka" įrašą, įkelti failą, įvesti pavadinimą.
3. **Serija** — pridėti naują nuotrauką į serijos sąrašą (drag & drop tvarkai) arba pakeisti viršelį.
4. **Atsiliepimas** — naujas įrašas: tekstas, vardas, proga, (nebūtina) nuoroda į Facebook.
5. **Spaudos įrašas** — leidinys, pavadinimas, nuoroda, data.
6. Paspaudus **Publish**, per kelias minutes pakeitimas pasirodo svetainėje automatiškai.
