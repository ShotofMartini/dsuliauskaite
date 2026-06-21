# Google įrankiai — paleidimo instrukcija

Šis dokumentas — ką Deimantei reikia susitvarkyti su Google, kad svetainė būtų randama paieškoje ir žemėlapyje. Visa tai turi atlikti **ji pati**, savo Google paskyra (paskyrų negaliu sukurti už ją).

Dalis žingsnių reikalauja **domeno** — kol jo neturite, galima atlikti tik 1 ir 3 dalis.

## 1. Google Business Profile (svarbiausia — vietinė paieška)

Tai profilis, kuris parodo ją Google paieškoje ir žemėlapyje, kai kas ieško "fotografas Vilniuje" ar pan. **Veikia net be domeno.**

1. Eiti į [google.com/business](https://www.google.com/business/) ir prisijungti (ar susikurti) Google paskyra savo vardu.
2. Paspausti **Pradėti** / **Manage now**.
3. Įvesti verslo pavadinimą: pvz. "Deimantė Šuliauskaitė — fotografas".
4. Kategorija: **Photographer** / **Fotografas**.
5. Vieta: jei nėra fizinio biuro/studijos, pasirinkti **"I deliver goods and services to my customers"** (paslaugas teikia klientų vietoje) — nereikės rodyti tikslaus adreso viešai, tik bendrą zoną (Vilnius).
6. Įvesti kontaktinius duomenis: telefoną (jei nori viešinti), el. paštą, Instagram/Facebook nuorodas.
7. Patvirtinti profilį — Google atsiųs kodą (SMS, skambutis arba laiškas) patvirtinimui.
8. Įkelti **5-10 geriausių nuotraukų** (portfolio pavyzdžiai) ir trumpą aprašymą paslaugų (vestuvės, krikštynos, portretai).
9. Kai bus pirmų klientų — paprašyti jų palikti **atsiliepimą (review)** profilyje. Tai labai stiprina matomumą paieškoje.

## 2. Google Search Console (reikalingas domenas)

Tai įrankis, kuris stebi, kaip Google indeksuoja svetainę, ir leidžia pateikti sitemap'ą greitesniam indeksavimui.

1. Kai turėsite domeną, eiti į [search.google.com/search-console](https://search.google.com/search-console).
2. Pasirinkti **"URL prefix"** (ne "Domain"), įvesti pilną svetainės adresą (pvz. `https://dsuliauskaite.lt/`).
3. Patvirtinti nuosavybę — paprasčiausias būdas: **HTML tag** metodas (Google duoda meta žymę, kurią aš įdėsiu į svetainės kodą), arba **DNS record** metodas per domeno registratorių.
4. Kai patvirtinta, **Sitemaps** skiltyje pateikti: `sitemap-index.xml` (jis jau automatiškai generuojamas svetainėje).
5. Per kelias dienas-savaites Google pradės indeksuoti puslapius — galėsite matyti statistiką (kiek žmonių rado per paiešką, kokiais žodžiais).

*(Pastaba: kol svetainė pažymėta `noindex` — žr. ankstesnį pokalbį — Google jos vis tiek nerodys paieškoje, net jei Search Console patvirtinta. Tai tyčia, kol svetainė nebaigta.)*

## 3. Google Analytics (neprivaloma, bet naudinga)

Rodo, kiek žmonių aplanko svetainę, iš kur jie atėjo (paieška, Instagram, ir t.t.).

1. [analytics.google.com](https://analytics.google.com) → susikurti paskyrą.
2. Sukurti naują "Property" su svetainės pavadinimu.
3. Gausite **Measurement ID** (formatas `G-XXXXXXX`) — atsiųskite man, įdėsiu kodą į svetainę.

## 4. Profesionalus el. paštas su domenu (neprivaloma, kainuoja)

Jei norėtumėte el. pašto adreso kaip `deimante@dsuliauskaite.lt` (vietoj `@gmail.com`):

- **Google Workspace** — apie €6-7/mėn. už vieną naudotoją, prisijungia per domeno DNS įrašus.
- Pigesnė alternatyva: dažnai domeno registratoriai (Hostinger, ir pan.) turi pigesnius arba įskaičiuotus pašto planus.

Tai visiškai neprivaloma — `dsuliauskaite@gmail.com` veikia puikiai ir nemokamai.

---

## Trumpas prioritetų sąrašas

1. **Dabar** (be domeno): Google Business Profile — didžiausias poveikis vietinei paieškai, nieko nelaukiant.
2. **Kai turėsite domeną**: Search Console + sitemap pateikimas.
3. **Vėliau, jei norėsite**: Analytics, profesionalus el. paštas.
