import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z59ogw16',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function patch(id, data) {
  await client.patch(id).set(data).commit()
  console.log(`✅ ${id}`)
}

async function patchByQuery(query, params, data) {
  const doc = await client.fetch(query, params)
  if (!doc?._id) { console.log(`⚠️  Not found: ${JSON.stringify(params)}`); return }
  await client.patch(doc._id).set(data).commit()
  console.log(`✅ ${doc._id}`)
}

console.log('\n═══ SEEDING SEO METADATA FROM ORIGINAL SITE ═══\n')

// ── Singleton Pages ──────────────────────────────────────────────────────────

await patch('homePage', {
  seoTitle: 'ASV Pest Control GmbH – Professionelle Schädlingsbekämpfung',
  seoDescription: 'ASV Pest Control GmbH – Ihr zuverlässiger Partner für professionelle Schädlingsbekämpfung. Über 30 Jahre Erfahrung, 24h Notdienst. Jetzt kostenloses Express-Angebot anfordern.',
})

await patch('taubenabwehrPage', {
  seoTitle: 'Taubenabwehr | ASV Pest Control GmbH',
  seoDescription: 'Professionelle Taubenabwehr von ASV Pest Control. Spikesysteme, Netze, elektrische Abwehr – dauerhafter Schutz für Ihr Gebäude. Jetzt beraten lassen.',
})

await patch('ueberUnsPage', {
  seoTitle: 'Über uns | ASV Pest Control GmbH',
  seoDescription: 'Lernen Sie ASV Pest Control kennen – über 30 Jahre Erfahrung in der professionellen Schädlingsbekämpfung. IHK-zertifiziert, über 20.000 zufriedene Kunden.',
})

await patch('superexpelPage', {
  seoTitle: 'Superexpel – Nr. 1 Vergrämungsmittel | ASV Pest Control GmbH',
  seoDescription: 'Superexpel – das preisgekrönte Vergrämungsmittel Nr. 1 gegen Marder und andere Wildtiere. Entwickelt von ASV Pest Control. Effektiv, sicher, langanhaltend.',
})

await patch('karrierePage', {
  seoTitle: 'Karriere | ASV Pest Control GmbH',
  seoDescription: 'Karriere bei ASV Pest Control – Werden Sie Teil unseres Teams. Offene Stellen in der Schädlingsbekämpfung. Faire Bezahlung, Weiterbildung, sicherer Arbeitsplatz.',
})

await patch('standortePage', {
  seoTitle: 'Unsere Standorte | ASV Pest Control GmbH',
  seoDescription: 'ASV Pest Control GmbH – 13 Standorte in Hessen, Rheinland-Pfalz und Baden-Württemberg. Finden Sie Ihren lokalen Kammerjäger mit 24h Notdienst.',
})

// ── Rechtliche Seiten ────────────────────────────────────────────────────────

await patch('legalPage-impressum', {
  seoTitle: 'Impressum | ASV Pest Control GmbH',
  seoDescription: 'Impressum der ASV Pest Control GmbH – Angaben gemäß § 5 TMG. Königsteiner Straße 6, 65812 Bad Soden am Taunus.',
})

await patch('legalPage-datenschutz', {
  seoTitle: 'Datenschutzerklärung | ASV Pest Control GmbH',
  seoDescription: 'Datenschutzerklärung der ASV Pest Control GmbH – Informationen zur Erhebung und Verarbeitung personenbezogener Daten gemäß DSGVO.',
})

// ── Schädlingsseiten ─────────────────────────────────────────────────────────
// Original site has one overview page; we have individual pages — craft matching SEO per pest

const schaedlinge = [
  {
    slug: 'wespen',
    seoTitle: 'Wespenbekämpfung | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Wespenbekämpfung von ASV Pest Control. Schnelle und sichere Entfernung von Wespennestern. 24h Notdienst, kostenlose Beratung.',
  },
  {
    slug: 'ratten',
    seoTitle: 'Rattenbekämpfung | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Rattenbekämpfung von ASV Pest Control. Effektive und nachhaltige Beseitigung von Rattenbefall. IHK-zertifiziert, 24h Notdienst.',
  },
  {
    slug: 'maeuse',
    seoTitle: 'Mäusebekämpfung | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Mäusebekämpfung von ASV Pest Control. Wirksame Bekämpfung und Prävention von Mäusebefall. Kostenlose Erstberatung.',
  },
  {
    slug: 'schaben',
    seoTitle: 'Schabenbekämpfung | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Schabenbekämpfung (Kakerlaken) von ASV Pest Control. Schnelle und diskrete Behandlung. IHK-zertifiziert, 24h Notdienst.',
  },
  {
    slug: 'ameisen',
    seoTitle: 'Ameisenbekämpfung | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Ameisenbekämpfung von ASV Pest Control. Wirksame Behandlung gegen Ameisen in Haus und Garten. Kostenlose Beratung.',
  },
  {
    slug: 'bettwanzen',
    seoTitle: 'Bettwanzenbekämpfung | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Bettwanzenbekämpfung von ASV Pest Control. Schnelle und diskrete Behandlung. Wärmebehandlung und chemische Methoden. 24h Notdienst.',
  },
  {
    slug: 'motten',
    seoTitle: 'Mottenbekämpfung | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Mottenbekämpfung von ASV Pest Control. Effektive Bekämpfung von Lebensmittelmotten, Kleidermotten & Co. Kostenlose Erstberatung.',
  },
  {
    slug: 'marder',
    seoTitle: 'Marderbekämpfung | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Mardervergrämung von ASV Pest Control. Schutz vor Marderschäden an Fahrzeugen und Gebäuden. Superexpel No. 1 Vergrämungsmittel.',
  },
  {
    slug: 'floehe',
    seoTitle: 'Flohbekämpfung | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Flohbekämpfung von ASV Pest Control. Wirksame Behandlung gegen Flöhe im Haus und bei Haustieren. Kostenlose Beratung.',
  },
  {
    slug: 'silberfische',
    seoTitle: 'Silberfischbekämpfung | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Silberfischbekämpfung von ASV Pest Control. Effektive und nachhaltige Beseitigung von Silberfischen. Kostenlose Erstberatung.',
  },
  {
    slug: 'taubenabwehr',
    seoTitle: 'Taubenabwehr | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Taubenabwehr von ASV Pest Control. Spikesysteme, Netze, elektrische Abwehr – dauerhafter Schutz für Ihr Gebäude. IHK-zertifiziert.',
  },
]

for (const pest of schaedlinge) {
  await patchByQuery(
    `*[_type == "schaedlingsseite" && slug.current == $slug][0]{ _id }`,
    { slug: pest.slug },
    { seoTitle: pest.seoTitle, seoDescription: pest.seoDescription }
  )
}

// ── Übersichtsseite Schädlinge ────────────────────────────────────────────────
// Check if there's a page with slug "schaedlinge"
await patchByQuery(
  `*[_type == "page" && slug.current == "schaedlinge"][0]{ _id }`,
  {},
  {
    seoTitle: 'Schädlingsbekämpfung – Alle Schädlinge im Überblick | ASV Pest Control GmbH',
    seoDescription: 'Professionelle Schädlingsbekämpfung für alle gängigen Schädlinge: Wespen, Ratten, Mäuse, Schaben, Ameisen, Bettwanzen, Motten, Marder, Flöhe und Silberfische. ASV Pest Control GmbH.',
  }
)

console.log('\n🎉 Alle SEO-Metadaten gespeichert!\n')
