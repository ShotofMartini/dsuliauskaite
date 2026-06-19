// One-time script: uploads real press mentions into Sanity.
// Usage: SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_TOKEN=xxx node scripts/migrate-press.mjs
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error('Reikia SANITY_PROJECT_ID ir SANITY_TOKEN (write token) aplinkos kintamųjų.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

const press = [
  {
    outlet: 'Valdovų rūmai',
    title: 'Pasidalijo naujausiais atradimais apie Lietuvos dvaruose buvusias Vakarų Europos tapybos kolekcijas',
    url: 'https://www.valdovurumai.lt/lt/nuotrauku-galerija/i/8940/pasidalijo-naujausiais-atradimais-apie-lietuvos-dvaruose-buvusias-vakaru-europos-tapybos-kolekcijas/',
    date: '2024-05-10',
  },
  {
    outlet: 'MadeinVilnius.lt',
    title: 'Valdovų rūmų muziejus švęs Vilniaus gimtadienį',
    url: 'https://madeinvilnius.lt/pramogos/renginiai/valdovu-rumu-muziejus-sves-vilniaus-gimtadieni/',
    date: '2025-01-25',
  },
  {
    outlet: '15min.lt',
    title: 'M.Jacovskio parodą aplankė būrys žinomų žmonių – O.Koršunovas, A.Cholina, M.Jampolskis su šeima',
    url: 'https://zmones.15min.lt/naujiena/m-jacovskio-paroda-aplanke-burys-zinomu-zmoniu-o-korsunovas-a-cholina-m-jampolskis-su-seima-odVPLPDjVjY',
    date: '2024-05-02',
  },
  {
    outlet: 'Panele.lt',
    title: 'Į Valdovų rūmus grįžta Užgavėnės ir jų puota',
    url: 'https://panele.lt/laisvalaikis/i-valdovu-rumus-grizta-uzgavenes-ir-ju-puota',
    date: '2026-02-11',
  },
  {
    outlet: '15min.lt',
    title: 'Pirmą kartą Lietuvoje – Botticellio, Tiziano kūrinių paroda',
    url: 'https://www.15min.lt/kultura/naujiena/vizualieji-menai/pirma-karta-lietuvoje-botticellio-tiziano-kuriniu-paroda-929-2342590',
    date: '2024-11-14',
  },
  {
    outlet: 'Valdovų rūmai',
    title: 'Valdovas, kurio atminimas Lietuvoje turi būti puoselėjamas',
    url: 'https://www.valdovurumai.lt/lt/naujienos/i/9527/valdovas-kurio-atminimas-lietuvoje-turi-buti-puoselejamas/',
    date: '2025-02-26',
  },
];

async function run() {
  console.log(`Keliama ${press.length} spaudos įrašų...`);
  for (const item of press) {
    const doc = await client.create({ _type: 'pressItem', ...item });
    console.log(`✓ pressItem "${item.title}" -> ${doc._id}`);
  }
  console.log('\nViskas perkelta!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
