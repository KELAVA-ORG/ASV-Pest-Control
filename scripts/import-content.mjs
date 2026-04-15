/**
 * ASV Pest Control – Sanity Content Import
 * Importiert alle Schädlingsseiten und Stadtseiten aus der alten Eleventy-Website.
 * Aufruf: node scripts/import-content.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'z59ogw16',
  dataset: 'production',
  token: 'skTHUAv7if1vZB8QLzSC1euPEriFHRdcnCx0GHKXsFBu3ytyRZouPlveptCZKe4M36ptZiclDtQkavzd38BCwifKNic8IUbkc0vtizUu0QZ5MeiEYTmSyQ6qZuzbf0EO4O4kuEPLnP6RMFJKstmtfVMmNDoV8t3AqCjFpa5rrJUZMY9JrafF',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ─────────────────────────────────────────
// HELPER: NJK Datei parsen
// ─────────────────────────────────────────
function parseNjk(filename) {
  const src = '/Users/digitalphoenix/Documents/claude-stuff/ASV Pest Control/src/'
  const content = readFileSync(resolve(src, filename), 'utf-8')

  const fm = {}
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (fmMatch) {
    fmMatch[1].split('\n').forEach(line => {
      const m = line.match(/^(\w+):\s*"(.+)"/)
      if (m) fm[m[1]] = m[2]
    })
  }

  const getText = (pattern) => {
    const m = content.match(pattern)
    return m ? m[1].replace(/&shy;/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim() : ''
  }

  const getAll = (pattern) => {
    const results = []
    let m
    const re = new RegExp(pattern.source, pattern.flags + (pattern.flags.includes('g') ? '' : 'g'))
    while ((m = re.exec(content)) !== null) results.push(m[1].trim())
    return results
  }

  // Title from h1
  const title = getText(/<h1[^>]*>([\s\S]*?)<\/h1>/)
  const heroSubtitle = getText(/<p class="hero__subtitle">([\s\S]*?)<\/p>/)

  // Intro section (first container--narrow)
  const introSectionMatch = content.match(/<!-- Problem Description[\s\S]*?<div class="container container--narrow"[\s\S]*?<h2>([\s\S]*?)<\/h2>([\s\S]*?)(?=<\/section>|<!-- )/)
  const introTitle = introSectionMatch ? introSectionMatch[1].replace(/&shy;/g, '').trim() : ''
  const introParasRaw = introSectionMatch ? introSectionMatch[2] : ''
  const introText = []
  let pm
  const paraRe = /<p>([\s\S]*?)<\/p>/g
  while ((pm = paraRe.exec(introParasRaw)) !== null) {
    const t = pm[1].replace(/<[^>]+>/g, '').replace(/&shy;/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim()
    if (t) introText.push(t)
  }

  // Signs section
  const signsSectionMatch = content.match(/<!-- Typical Signs[\s\S]*?<h2>([\s\S]*?)<\/h2>([\s\S]*?)(?=<\/section>|<!-- )/)
  const signsTitle = signsSectionMatch ? signsSectionMatch[1].trim() : 'Typische Anzeichen für Befall'
  const signs = []
  if (signsSectionMatch) {
    const cardsHtml = signsSectionMatch[2]
    const cardRe = /<div class="service-card"[\s\S]*?<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g
    let cm
    while ((cm = cardRe.exec(cardsHtml)) !== null) {
      signs.push({ title: cm[1].replace(/&amp;/g, '&').trim(), description: cm[2].trim() })
    }
  }

  // Risks section
  const risksSectionMatch = content.match(/<!-- Risks[\s\S]*?<h2>([\s\S]*?)<\/h2>([\s\S]*?)<ul class="risk-list">([\s\S]*?)<\/ul>/)
  const risksTitle = risksSectionMatch ? risksSectionMatch[1].trim() : 'Gefahren und Risiken'
  const risks = []
  if (risksSectionMatch) {
    const riskRe = /<li><strong>([\s\S]*?)<\/strong>([\s\S]*?)<\/li>/g
    let rm
    while ((rm = riskRe.exec(risksSectionMatch[3])) !== null) {
      risks.push({ title: rm[1].trim(), description: rm[2].replace(/^[:\s]+/, '').trim() })
    }
  }

  // Treatment section
  const treatSectionMatch = content.match(/<!-- Professional Treatment[\s\S]*?<h2>([\s\S]*?)<\/h2>([\s\S]*?)(?=<ul class="check-list"|<\/div>)/)
  const treatmentTitle = treatSectionMatch ? treatSectionMatch[1].trim() : ''
  const treatmentText = []
  if (treatSectionMatch) {
    const tpRe = /<p>([\s\S]*?)<\/p>/g
    let tp
    while ((tp = tpRe.exec(treatSectionMatch[2])) !== null) {
      const t = tp[1].replace(/<[^>]+>/g, '').replace(/&shy;/g, '').replace(/&amp;/g, '&').trim()
      if (t) treatmentText.push(t)
    }
  }
  const checkListMatch = content.match(/<ul class="check-list">([\s\S]*?)<\/ul>/)
  const treatmentCheckList = []
  if (checkListMatch) {
    const liRe = /<li>([\s\S]*?)<\/li>/g
    let li
    while ((li = liRe.exec(checkListMatch[1])) !== null) {
      treatmentCheckList.push(li[1].replace(/<[^>]+>/g, '').trim())
    }
  }

  // Process steps
  const processSectionMatch = content.match(/<!-- Process Steps[\s\S]*?<h2>([\s\S]*?)<\/h2>([\s\S]*?)(?=<\/section>|<!-- )/)
  const processTitle = processSectionMatch ? processSectionMatch[1].trim() : 'Unser Vorgehen'
  const processSteps = []
  if (processSectionMatch) {
    const stepRe = /<div class="process__number">(\d+)<\/div>\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g
    let ps
    while ((ps = stepRe.exec(processSectionMatch[2])) !== null) {
      processSteps.push({ stepNumber: ps[1], title: ps[2].replace(/&amp;/g, '&').trim(), description: ps[3].trim() })
    }
  }

  // CTA Banner
  const ctaMatch = content.match(/<section class="cta-banner"[\s\S]*?<h2>([\s\S]*?)<\/h2>\s*<p>([\s\S]*?)<\/p>/)
  const ctaBannerTitle = ctaMatch ? ctaMatch[1].trim() : ''
  const ctaBannerText = ctaMatch ? ctaMatch[2].trim() : ''

  // FAQ
  const faqSectionMatch = content.match(/<!-- FAQ[\s\S]*?<h2>([\s\S]*?)<\/h2>([\s\S]*?)(?=<\/section>|$)/)
  const faqTitle = faqSectionMatch ? faqSectionMatch[1].trim() : 'Häufig gestellte Fragen'
  const faqs = []
  if (faqSectionMatch) {
    const faqRe = /<button class="accordion__trigger"[^>]*>\s*<span>([\s\S]*?)<\/span>[\s\S]*?<div class="accordion__body">\s*<p>([\s\S]*?)<\/p>/g
    let fq
    while ((fq = faqRe.exec(faqSectionMatch[2])) !== null) {
      faqs.push({ question: fq[1].trim(), answer: fq[2].trim() })
    }
  }

  return {
    slug: (fm.permalink || '').replace('.html', ''),
    seoTitle: fm.title || '',
    seoDescription: fm.description || '',
    title,
    heroSubtitle,
    introTitle,
    introText,
    signsTitle,
    signs,
    risksTitle,
    risks,
    treatmentTitle,
    treatmentText,
    treatmentCheckList,
    processTitle,
    processSteps,
    ctaBannerTitle,
    ctaBannerText,
    faqTitle,
    faqs,
  }
}

// ─────────────────────────────────────────
// STADTSEITEN-DATEN (aus staedte.js)
// ─────────────────────────────────────────
const STAEDTE_PATH = '/Users/digitalphoenix/Documents/claude-stuff/ASV Pest Control/src/_data/staedte.js'
const staedteRaw = readFileSync(STAEDTE_PATH, 'utf-8')
  .replace('module.exports = ', 'export default ')
const staedte = (await import(`data:text/javascript,${encodeURIComponent(staedteRaw)}`)).default

// ─────────────────────────────────────────
// HELPER: Portable Text erzeugen
// ─────────────────────────────────────────
function toBlocks(paragraphs) {
  return (paragraphs || []).map((text, i) => ({
    _type: 'block',
    _key: `block_${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `span_${i}`, text, marks: [] }],
  }))
}

// ─────────────────────────────────────────
// SCHÄDLINGSSEITEN IMPORTIEREN
// ─────────────────────────────────────────
const SCHAEDLINGS_FILES = [
  'ratten.njk',
  'maeuse.njk',
  'wespen.njk',
  'schaben.njk',
  'ameisen.njk',
  'bettwanzen.njk',
  'floehe.njk',
  'marder.njk',
  'motten.njk',
  'silberfische.njk',
  'taubenabwehr.njk',
]

console.log('\n📦 Importiere Schädlingsseiten...\n')
for (const file of SCHAEDLINGS_FILES) {
  try {
    const data = parseNjk(file)
    if (!data.slug) { console.log(`  ⚠️  Kein Slug in ${file} – übersprungen`); continue }

    const doc = {
      _id: `schaedlingsseite-${data.slug}`,
      _type: 'schaedlingsseite',
      title: data.title || data.slug,
      slug: { _type: 'slug', current: data.slug },
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      heroSubtitle: data.heroSubtitle,
      introTitle: data.introTitle,
      introText: toBlocks(data.introText),
      signsTitle: data.signsTitle,
      signs: data.signs.map((s, i) => ({ _type: 'sign', _key: `sign_${i}`, ...s })),
      risksTitle: data.risksTitle,
      risks: data.risks.map((r, i) => ({ _type: 'risk', _key: `risk_${i}`, ...r })),
      treatmentTitle: data.treatmentTitle,
      treatmentText: toBlocks(data.treatmentText),
      treatmentCheckList: data.treatmentCheckList,
      processTitle: data.processTitle,
      processSteps: data.processSteps.map((s, i) => ({ _type: 'processStep', _key: `step_${i}`, ...s })),
      ctaBannerTitle: data.ctaBannerTitle,
      ctaBannerText: data.ctaBannerText,
      faqTitle: data.faqTitle,
      faqs: data.faqs.map((f, i) => ({ _type: 'faq', _key: `faq_${i}`, ...f })),
    }

    await client.createOrReplace(doc)
    console.log(`  ✅ ${data.slug} – "${data.title}"`)
  } catch (err) {
    console.error(`  ❌ Fehler bei ${file}:`, err.message)
  }
}

// ─────────────────────────────────────────
// STADTSEITEN IMPORTIEREN
// ─────────────────────────────────────────
console.log('\n🏙️  Importiere Stadtseiten...\n')
for (const city of staedte) {
  try {
    const doc = {
      _id: `stadtseite-${city.slug}`,
      _type: 'stadtseite',
      cityName: city.cityName,
      cityShort: city.cityShort,
      slug: { _type: 'slug', current: city.slug },
      seoTitle: city.metaTitle,
      seoDescription: city.metaDescription,
      phone: city.phone,
      phoneFormatted: city.phoneFormatted,
      phoneTel: city.phoneTel,
      address: city.address,
      geo: city.geo,
      plzExample: city.plzExample,
      heroSubtitle: city.heroSubtitle,
      cityDescription: city.cityDescription,
      districts: city.districts,
      einsatzgebietDesc: city.einsatzgebietDesc,
      testimonials: (city.testimonials || []).map((t, i) => ({
        _type: 'testimonial',
        _key: `testimonial_${i}`,
        text: t.text,
        author: t.author,
        location: t.location,
        rating: 5,
      })),
      faqs: (city.faqs || []).map((f, i) => ({
        _type: 'faq',
        _key: `faq_${i}`,
        question: f.question,
        answer: f.answer,
        answerSchema: f.answerSchema,
      })),
    }

    await client.createOrReplace(doc)
    console.log(`  ✅ ${city.slug} – ${city.cityName}`)
  } catch (err) {
    console.error(`  ❌ Fehler bei ${city.slug}:`, err.message)
  }
}

console.log('\n🎉 Import abgeschlossen!\n')
