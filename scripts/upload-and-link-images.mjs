import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images')

const client = createClient({
  projectId: 'z59ogw16',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function uploadImage(filename, label) {
  const filepath = path.join(IMAGES_DIR, filename)
  console.log(`  ⬆️  Uploading ${filename}...`)
  const asset = await client.assets.upload('image', createReadStream(filepath), {
    filename,
    contentType: filename.endsWith('.svg') ? 'image/svg+xml' : 'image/webp',
  })
  console.log(`  ✅ ${label} → ${asset._id}`)
  return asset._id
}

function imageRef(assetId, alt = '') {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
    alt,
  }
}

async function run() {
  console.log('\n═══ UPLOADING IMAGES TO SANITY ═══\n')

  // Upload all images
  const [
    kammerjägerHero,
    taubenabwehrHero,
    schaedlingsbekaempfer,
    mitarbeiterin,
    superexpelProdukt,
    superexpelSiegel,
    amsienBild,
    bettwanzenBild,
    floeheBild,
    maeusBild,
    marderBild,
    mottenBild,
    rattenBild,
    schabenBild,
    silberfischeBild,
    wespenBild,
    siegel,
  ] = await Promise.all([
    uploadImage('kammerjaeger-desinfektion-kueche-scaled.webp', 'Kammerjäger Desinfektion (Hero)'),
    uploadImage('taubenabwehr.webp', 'Taubenabwehr Hero'),
    uploadImage('schaedlingsbekaempfer.webp', 'Schädlingsbekämpfer Techniker'),
    uploadImage('Asv-pestcontrol-mitarbeiterin.webp', 'ASV Mitarbeiterin'),
    uploadImage('marder-superexpel-pulver-vergraemungsmittel-no1.webp', 'Superexpel Produkt'),
    uploadImage('auszeichnung-superexpel-siegel.webp', 'Superexpel Auszeichnung'),
    uploadImage('ameisenbekaempfung.webp', 'Ameisenbekämpfung'),
    uploadImage('bettwanzenbekaempfung.webp', 'Bettwanzenbekämpfung'),
    uploadImage('floehe.webp', 'Flöhe'),
    uploadImage('maeusebekaempfung.webp', 'Mäusebekämpfung'),
    uploadImage('marderbekaempfung.webp', 'Marderbekämpfung'),
    uploadImage('mottenbekaempfung.webp', 'Mottenbekämpfung'),
    uploadImage('rattenbekaempfung.webp', 'Rattenbekämpfung'),
    uploadImage('schaben-kakerlaken.webp', 'Schaben / Kakerlaken'),
    uploadImage('silberfische.webp', 'Silberfische'),
    uploadImage('wespennest-bekaempfung.webp', 'Wespennest'),
    uploadImage('sigel.webp', 'IHK Siegel / Zertifizierung'),
  ])

  console.log('\n═══ PATCHING DOCUMENTS ═══\n')

  // ── homePage ──────────────────────────────────────────────
  console.log('📄 homePage...')
  await client.patch('homePage')
    .set({
      heroImage: imageRef(kammerjägerHero, 'Kammerjäger bei der Arbeit'),
      taubenImage: imageRef(taubenabwehrHero, 'Professionelle Taubenabwehr'),
    })
    .commit()
  console.log('  ✅ homePage updated')

  // ── taubenabwehrPage ──────────────────────────────────────
  console.log('📄 taubenabwehrPage...')
  await client.patch('taubenabwehrPage')
    .set({ splitImage: imageRef(schaedlingsbekaempfer, 'ASV Pest Control Techniker bei der Taubenabwehr') })
    .commit()
  console.log('  ✅ taubenabwehrPage updated')

  // ── ueberUnsPage ──────────────────────────────────────────
  console.log('📄 ueberUnsPage...')
  await client.patch('ueberUnsPage')
    .set({ storyImage: imageRef(mitarbeiterin, 'ASV Pest Control Mitarbeiterin') })
    .commit()
  console.log('  ✅ ueberUnsPage updated')

  // ── superexpelPage ────────────────────────────────────────
  console.log('📄 superexpelPage...')
  await client.patch('superexpelPage')
    .set({ introImage: imageRef(superexpelProdukt, 'Superexpel Vergrämungsmittel No. 1') })
    .commit()
  console.log('  ✅ superexpelPage updated')

  // ── schaedlingsseiten ─────────────────────────────────────
  const pestMapping = [
    { slug: 'ameisen',       heroId: amsienBild,     treatId: amsienBild,     heroAlt: 'Ameisenbekämpfung',     treatAlt: 'Ameisenbekämpfung Behandlung' },
    { slug: 'bettwanzen',    heroId: bettwanzenBild, treatId: bettwanzenBild, heroAlt: 'Bettwanzenbekämpfung',  treatAlt: 'Bettwanzen Behandlung' },
    { slug: 'floehe',        heroId: floeheBild,     treatId: floeheBild,     heroAlt: 'Flohbekämpfung',        treatAlt: 'Flöhe Behandlung' },
    { slug: 'maeuse',        heroId: maeusBild,      treatId: maeusBild,      heroAlt: 'Mäusebekämpfung',       treatAlt: 'Mäuse Behandlung' },
    { slug: 'marder',        heroId: marderBild,     treatId: marderBild,     heroAlt: 'Marderbekämpfung',      treatAlt: 'Marder Behandlung' },
    { slug: 'motten',        heroId: mottenBild,     treatId: mottenBild,     heroAlt: 'Mottenbekämpfung',      treatAlt: 'Motten Behandlung' },
    { slug: 'ratten',        heroId: rattenBild,     treatId: rattenBild,     heroAlt: 'Rattenbekämpfung',      treatAlt: 'Ratten Behandlung' },
    { slug: 'schaben',       heroId: schabenBild,    treatId: schabenBild,    heroAlt: 'Schabenbekämpfung',     treatAlt: 'Schaben Behandlung' },
    { slug: 'silberfische',  heroId: silberfischeBild, treatId: silberfischeBild, heroAlt: 'Silberfischbekämpfung', treatAlt: 'Silberfische Behandlung' },
    { slug: 'taubenabwehr',  heroId: taubenabwehrHero, treatId: schaedlingsbekaempfer, heroAlt: 'Taubenabwehr professionell', treatAlt: 'Taubenabwehr Techniker' },
    { slug: 'wespen',        heroId: wespenBild,     treatId: schaedlingsbekaempfer, heroAlt: 'Wespenbekämpfung',     treatAlt: 'Wespen Behandlung' },
  ]

  for (const pest of pestMapping) {
    console.log(`🐛 schaedlingsseite/${pest.slug}...`)
    const doc = await client.fetch(`*[_type == 'schaedlingsseite' && slug.current == $slug][0]{ _id }`, { slug: pest.slug })
    if (!doc) { console.log(`  ⚠️  Not found: ${pest.slug}`); continue }
    await client.patch(doc._id)
      .setIfMissing({ heroImage: imageRef(pest.heroId, pest.heroAlt) })
      .set({ heroImage: imageRef(pest.heroId, pest.heroAlt), treatmentImage: imageRef(pest.treatId, pest.treatAlt) })
      .commit()
    console.log(`  ✅ ${pest.slug} updated`)
  }

  // ── ueberUnsPage siegel ───────────────────────────────────
  // Patch the siegel into certifications
  console.log('📄 ueberUnsPage siegel...')
  const ueberDoc = await client.fetch(`*[_type == 'ueberUnsPage'][0]{ certifications }`)
  if (!ueberDoc?.certifications?.length) {
    await client.patch('ueberUnsPage')
      .set({
        certifications: [
          imageRef(siegel, 'IHK-zertifiziert – Schädlingsbekämpfung'),
          imageRef(superexpelSiegel, 'Superexpel No. 1 Auszeichnung'),
        ]
      })
      .commit()
    console.log('  ✅ ueberUnsPage certifications updated')
  }

  console.log('\n🎉 Alle Bilder hochgeladen und verknüpft!\n')
}

run().catch(console.error)
