import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const env = dotenv.parse(readFileSync(join(__dirname, '../.env.local')))

const client = createClient({
  projectId: 'z59ogw16',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seed() {
  console.log('Seeding singleton page documents...\n')

  // 1. homePage
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroTitle: 'Professionelle Schädlingsbekämpfung',
    heroSubtitle: 'IHK-zertifiziert · 24h Notdienst · Rhein-Main-Gebiet',
    trustStats: [
      { _key: 'stat1', num: '20+', label: 'Jahre Erfahrung' },
      { _key: 'stat2', num: '5.000+', label: 'Einsätze jährlich' },
      { _key: 'stat3', num: '24/7', label: 'Notdienst' },
      { _key: 'stat4', num: '100%', label: 'IHK-zertifiziert' },
    ],
    taubenTitle: 'Professionelle Taubenabwehr',
    taubenChecklist: [
      'Dauerhafte Vergrämungssysteme',
      'Gebäudeschutz ohne optische Beeinträchtigung',
      'Reinigung und Desinfektion von Taubenkot',
    ],
    processTitle: "So funktioniert's",
    processSteps: [
      { _key: 'step1', num: '01', title: 'Anfrage & Beratung', text: 'Kontaktieren Sie uns telefonisch oder per Formular. Wir beraten Sie kostenlos und unverbindlich.' },
      { _key: 'step2', num: '02', title: 'Vor-Ort-Inspektion', text: 'Unsere Experten besichtigen die betroffene Fläche und erstellen eine individuelle Analyse.' },
      { _key: 'step3', num: '03', title: 'Maßgeschneiderter Plan', text: 'Wir entwickeln eine effektive Bekämpfungsstrategie und erstellen ein transparentes Angebot.' },
      { _key: 'step4', num: '04', title: 'Professionelle Durchführung', text: 'Unsere zertifizierten Techniker führen die Bekämpfung durch – diskret, schnell und nachhaltig.' },
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      { _key: 'faq1', question: 'Wie schnell können Sie bei einem akuten Befall reagieren?', answer: 'Bei dringenden Fällen sind wir in der Regel innerhalb von 24 Stunden vor Ort – in Notfällen auch außerhalb der regulären Geschäftszeiten.' },
      { _key: 'faq2', question: 'Sind Ihre Bekämpfungsmittel sicher für Kinder und Haustiere?', answer: 'Ja. Wir setzen umweltschonende, zugelassene Mittel ein und informieren Sie vorab über alle notwendigen Sicherheitsvorkehrungen.' },
      { _key: 'faq3', question: 'Was kostet eine professionelle Schädlingsbekämpfung?', answer: 'Die Kosten hängen von der Art des Befalls, dem Ausmaß und der Fläche ab. Wir erstellen Ihnen immer zuerst ein kostenloses, unverbindliches Angebot.' },
      { _key: 'faq4', question: 'In welchen Regionen sind Sie tätig?', answer: 'Wir sind im gesamten Rhein-Main-Gebiet tätig: Frankfurt, Wiesbaden, Mainz, Darmstadt, Bad Homburg, Offenbach und angrenzende Gebiete.' },
    ],
    ctaTitle: 'Schädlingsbefall? Wir helfen sofort.',
    ctaText: 'Fordern Sie jetzt Ihr kostenloses Express-Angebot an – unverbindlich und schnell.',
  })
  console.log('✓ homePage seeded')

  // 2. taubenabwehrPage
  await client.createOrReplace({
    _id: 'taubenabwehrPage',
    _type: 'taubenabwehrPage',
    heroSubtitle: 'Professionelle Vergrämung und Gebäudeschutz – IHK-zertifiziert, nachhaltig, diskret',
    introTitle: 'Tauben – ein unterschätztes Problem',
    services: [
      { _key: 's1', title: 'Spike-Systeme', description: 'Edelstahl-Spikes verhindern das Landen auf Simsen, Dächern und Fensterbrettern – dauerhaft und optisch dezent.' },
      { _key: 's2', title: 'Vogelschutznetze', description: 'Robuste Netze schützen Innenhöfe, Balkone und Dachflächen zuverlässig vor Tauben jeder Größe.' },
      { _key: 's3', title: 'Elektrische Abwehr', description: 'Schwachstrom-Systeme trainieren Tauben, bestimmte Bereiche zu meiden – tierschutzkonform und effektiv.' },
      { _key: 's4', title: 'Optische Vergrämung', description: 'Greifvogel-Attrappen, Folienstreifen und andere visuelle Mittel ergänzen das Schutzkonzept.' },
      { _key: 's5', title: 'Reinigung & Desinfektion', description: 'Taubenkot enthält Krankheitserreger. Wir reinigen und desinfizieren befallene Flächen professionell.' },
      { _key: 's6', title: 'Individuelle Beratung', description: 'Jedes Gebäude ist anders. Wir entwickeln ein maßgeschneidertes Schutzkonzept für Ihre Immobilie.' },
    ],
    splitTitle: 'Professionelle Taubenabwehr für Ihre Immobilie',
    splitChecklist: [
      'Dauerhafte Vergrämungssysteme ohne Tierschutzprobleme',
      'Gebäudeschutz ohne optische Beeinträchtigung',
      'Reinigung und Desinfektion von Taubenkot',
      'Kostenloses Erstgespräch und unverbindliches Angebot',
    ],
    processTitle: 'Unser Vorgehen bei der Taubenabwehr',
    processSteps: [
      { _key: 'p1', num: '01', title: 'Besichtigung & Analyse', text: 'Wir begutachten das Gebäude, identifizieren Schlafplätze und Einflugöffnungen.' },
      { _key: 'p2', num: '02', title: 'Konzeptentwicklung', text: 'Wir entwickeln ein maßgeschneidertes Schutzkonzept und erstellen ein transparentes Angebot.' },
      { _key: 'p3', num: '03', title: 'Professionelle Montage', text: 'Unsere Techniker installieren die Abwehrsysteme fachgerecht und diskret.' },
      { _key: 'p4', num: '04', title: 'Nachkontrolle', text: 'Wir kontrollieren den Erfolg der Maßnahmen und passen das System bei Bedarf an.' },
    ],
    faqTitle: 'Häufige Fragen zur Taubenabwehr',
    faqs: [
      { _key: 'f1', question: 'Ist Taubenabwehr tierschutzkonform?', answer: 'Ja. Alle unsere Methoden sind tierschutzkonform. Wir vertreiben Tauben, ohne ihnen Schaden zuzufügen.' },
      { _key: 'f2', question: 'Wie lange hält eine Taubenabwehr?', answer: 'Professionell installierte Systeme wie Spikes oder Netze halten viele Jahre. Regelmäßige Wartung verlängert die Lebensdauer.' },
      { _key: 'f3', question: 'Was kostet Taubenabwehr?', answer: 'Die Kosten hängen von der Größe der zu schützenden Fläche und dem gewählten System ab. Wir erstellen ein kostenloses Angebot.' },
      { _key: 'f4', question: 'Können Tauben wirklich Krankheiten übertragen?', answer: 'Ja. Taubenkot enthält Pilze und Bakterien, die für Menschen gefährlich sein können. Professionelle Reinigung ist wichtig.' },
      { _key: 'f5', question: 'Für welche Gebäude ist Taubenabwehr sinnvoll?', answer: 'Für alle Gebäude mit Taubenbefall: Wohnhäuser, Bürogebäude, Industrieanlagen, Kirchen, Brücken und mehr.' },
    ],
    ctaTitle: 'Taubenprobleme? Wir helfen sofort.',
    ctaText: 'Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot.',
  })
  console.log('✓ taubenabwehrPage seeded')

  // 3. ueberUnsPage
  await client.createOrReplace({
    _id: 'ueberUnsPage',
    _type: 'ueberUnsPage',
    heroSubtitle: 'Ihr zuverlässiger Partner für professionelle Schädlingsbekämpfung seit über 20 Jahren',
    storyTitle: 'Unsere Geschichte',
    stats: [
      { _key: 's1', num: '20+', label: 'Jahre Erfahrung' },
      { _key: 's2', num: '5.000+', label: 'Einsätze jährlich' },
      { _key: 's3', num: '50+', label: 'Zertifizierte Techniker' },
      { _key: 's4', num: '100%', label: 'IHK-zertifiziert' },
    ],
    valuesTitle: 'Unsere Werte',
    values: [
      { _key: 'v1', title: 'Fachkompetenz', text: 'Alle unsere Techniker sind IHK-geprüfte Schädlingsbekämpfer mit regelmäßigen Fortbildungen.' },
      { _key: 'v2', title: 'Diskretion', text: 'Schädlingsbefall ist sensibel. Wir arbeiten diskret und respektieren Ihre Privatsphäre.' },
      { _key: 'v3', title: 'Umweltbewusstsein', text: 'Wir setzen bevorzugt umweltschonende Methoden ein und minimieren den Einsatz von Chemikalien.' },
      { _key: 'v4', title: 'Zuverlässigkeit', text: 'Vereinbarte Termine werden eingehalten. Unsere Techniker kommen pünktlich und gut ausgerüstet.' },
      { _key: 'v5', title: 'Transparenz', text: 'Klare Angebote ohne versteckte Kosten. Sie wissen immer, was Sie erwartet und was es kostet.' },
      { _key: 'v6', title: '24h Notdienst', text: 'Bei akuten Gefährdungen sind wir auch außerhalb der Geschäftszeiten für Sie erreichbar.' },
    ],
    certifications: [
      'IHK-geprüfte Schädlingsbekämpfer',
      'Sachkundenachweis nach § 4 Tierschutzgesetz',
      'Zertifizierter Umgang mit Bioziden',
      'Regelmäßige Weiterbildungen',
      'Mitglied im Deutschen Schädlingsbekämpfer-Verband (DSV)',
    ],
    ctaTitle: 'Lernen Sie uns kennen',
    ctaText: 'Fordern Sie jetzt Ihr kostenloses Express-Angebot an – unverbindlich und transparent.',
  })
  console.log('✓ ueberUnsPage seeded')

  // 4. standortePage
  await client.createOrReplace({
    _id: 'standortePage',
    _type: 'standortePage',
    heroSubtitle: 'Wir sind im gesamten Rhein-Main-Gebiet für Sie im Einsatz – schnell, zuverlässig, vor Ort.',
    introText: 'ASV Pest Control betreut Privathaushalte, Gewerbebetriebe und öffentliche Einrichtungen in folgenden Städten und Regionen:',
    locations: [
      { _key: 'l1', name: 'Bad Soden am Taunus (Hauptsitz)', address: 'Königsteiner Straße 6, 65812 Bad Soden am Taunus', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l2', name: 'Frankfurt am Main', address: 'Einsatzgebiet Frankfurt und Umgebung', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l3', name: 'Wiesbaden', address: 'Einsatzgebiet Wiesbaden und Umgebung', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l4', name: 'Mainz', address: 'Einsatzgebiet Mainz und Umgebung', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l5', name: 'Darmstadt', address: 'Einsatzgebiet Darmstadt und Umgebung', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l6', name: 'Bad Homburg', address: 'Einsatzgebiet Bad Homburg und Taunus', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l7', name: 'Offenbach am Main', address: 'Einsatzgebiet Offenbach und Umgebung', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l8', name: 'Hanau', address: 'Einsatzgebiet Hanau und Main-Kinzig-Kreis', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l9', name: 'Rüsselsheim', address: 'Einsatzgebiet Rüsselsheim und Groß-Gerau', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l10', name: 'Aschaffenburg', address: 'Einsatzgebiet Aschaffenburg und Umgebung', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l11', name: 'Gießen', address: 'Einsatzgebiet Gießen und Lahn-Dill-Kreis', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l12', name: 'Marburg', address: 'Einsatzgebiet Marburg und Umgebung', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
      { _key: 'l13', name: 'Fulda', address: 'Einsatzgebiet Fulda und Osthessen', phone: '+49 6196 – 52 30 10', phoneTel: '+496196523010', hours: 'Mo–Fr 8:00–18:00 Uhr' },
    ],
    hotlineTitle: 'Nicht in Ihrer Stadt dabei?',
    hotlineText: 'Kein Problem – unser Einsatzgebiet ist flexibel. Rufen Sie uns an und wir prüfen, ob wir auch in Ihrer Region helfen können.',
    ctaTitle: 'Schädlingsbefall in Ihrer Nähe?',
    ctaText: 'Wir kommen schnell zu Ihnen – im gesamten Rhein-Main-Gebiet.',
  })
  console.log('✓ standortePage seeded')

  // 5. karrierePage
  await client.createOrReplace({
    _id: 'karrierePage',
    _type: 'karrierePage',
    heroSubtitle: 'Werden Sie Teil unseres Teams – spannende Aufgaben, faire Bezahlung, echte Entwicklungsperspektiven',
    introTitle: 'Karriere bei ASV Pest Control',
    benefitsTitle: 'Was wir bieten',
    benefits: [
      { _key: 'b1', title: 'Faire Vergütung', text: 'Marktgerechtes Gehalt, Prämien und Zusatzleistungen wie Firmenwagen oder -handy.' },
      { _key: 'b2', title: 'Weiterbildung', text: 'Regelmäßige Schulungen, IHK-Prüfungsvorbereitung und Fortbildungen auf Ihre Kosten.' },
      { _key: 'b3', title: 'Sicherer Job', text: 'Unbefristeter Arbeitsvertrag in einem wachsenden Unternehmen mit stabiler Auftragslage.' },
      { _key: 'b4', title: 'Team & Kultur', text: 'Kollegiales Miteinander, flache Hierarchien und kurze Entscheidungswege.' },
      { _key: 'b5', title: 'Modernes Equipment', text: 'Neueste Arbeitsmittel, gut ausgestattete Fahrzeuge und professionelle Schutzausrüstung.' },
      { _key: 'b6', title: 'Flexible Einteilung', text: 'Wir berücksichtigen Ihre persönlichen Bedürfnisse bei der Tourenplanung.' },
    ],
    jobsTitle: 'Aktuelle Stellenangebote',
    jobs: [
      {
        _key: 'j1',
        title: 'Schädlingsbekämpfer (m/w/d)',
        type: 'Vollzeit',
        location: 'Rhein-Main-Gebiet',
        description: 'Für unser wachsendes Team suchen wir erfahrene oder motivierte Quereinsteiger in der Schädlingsbekämpfung.',
        requirements: ['Führerschein Klasse B', 'Zuverlässigkeit und Pünktlichkeit', 'Bereitschaft zu Außendienst', 'IHK-Sachkundenachweis von Vorteil'],
      },
      {
        _key: 'j2',
        title: 'Auszubildender Schädlingsbekämpfer (m/w/d)',
        type: 'Ausbildung',
        location: 'Bad Soden am Taunus',
        description: 'Starten Sie Ihre Karriere mit einer anerkannten Ausbildung zum/zur Schädlingsbekämpfer/in – wir begleiten Sie von Anfang an.',
        requirements: ['Hauptschulabschluss oder höher', 'Interesse an Biologie und Technik', 'Führerschein Klasse B (oder in Vorbereitung)', 'Teamfähigkeit und Lernbereitschaft'],
      },
      {
        _key: 'j3',
        title: 'Büromanagement / Disposition (m/w/d)',
        type: 'Teilzeit / Vollzeit',
        location: 'Bad Soden am Taunus',
        description: 'Unterstützen Sie unser Team bei der Planung, Kundenkommunikation und Büroorganisation.',
        requirements: ['Kaufmännische Ausbildung oder Erfahrung', 'Sicherer Umgang mit PC und Office', 'Freundliches Auftreten am Telefon', 'Organisationstalent'],
      },
    ],
    initiativeTitle: 'Keine passende Stelle dabei?',
    initiativeText: 'Wir freuen uns jederzeit über Initiativbewerbungen. Schicken Sie uns einfach Ihre Unterlagen an info@a-asv.de – wir melden uns.',
    ctaTitle: 'Bereit für den nächsten Schritt?',
    ctaText: 'Bewerben Sie sich jetzt – wir freuen uns auf Sie!',
  })
  console.log('✓ karrierePage seeded')

  // 6. superexpelPage
  await client.createOrReplace({
    _id: 'superexpelPage',
    _type: 'superexpelPage',
    heroSubtitle: 'Effektiver Schutz gegen Marder und Wildtiere auf natürlicher Basis',
    introTitle: 'Superexpel – Effektiver Schutz auf natürlicher Basis',
    introChecklist: [
      'Natürliche Inhaltsstoffe – sicher für Mensch und Tier',
      'Langanhaltende Wirkung über mehrere Wochen',
      'Einfache Anwendung ohne Fachkenntnisse',
      'Über 20.000 erfolgreiche Anwendungen',
      'Tierschutzkonform und unbedenklich',
    ],
    stats: [
      { _key: 's1', num: 'Nr. 1', label: 'Vergrämungsmittel' },
      { _key: 's2', num: '20.000+', label: 'Anwendungen' },
      { _key: 's3', num: '100%', label: 'Natürliche Basis' },
      { _key: 's4', num: '4–6', label: 'Wochen Wirkung' },
    ],
    usesTitle: 'Anwendungsbereiche',
    uses: [
      { _key: 'u1', title: 'Motorraum', text: 'Schützen Sie Ihr Fahrzeug vor Marderbissen. Superexpel hält Marder dauerhaft fern – ohne Falle, ohne Elektroschock.' },
      { _key: 'u2', title: 'Dachboden & Keller', text: 'Gegen Marder, Ratten und andere Wildtiere in Gebäuden. Einfach ausbringen und mehrere Wochen geschützt.' },
      { _key: 'u3', title: 'Garten & Außenbereich', text: 'Halten Sie Wildtiere aus Ihrem Garten, Ihrer Terrasse oder von Mülltonnen fern – tierschutzkonform.' },
    ],
    processTitle: "So einfach geht's",
    processSteps: [
      { _key: 'p1', num: '01', title: 'Bereich reinigen', text: 'Entfernen Sie vorhandene Spuren und reinigen Sie die betroffene Fläche vor der Anwendung.' },
      { _key: 'p2', num: '02', title: 'Pulver verteilen', text: 'Streuen Sie Superexpel gleichmäßig im betroffenen Bereich aus. Keine Schutzausrüstung nötig.' },
      { _key: 'p3', num: '03', title: 'Wirken lassen', text: 'Die natürlichen Duftstoffe entfalten ihre Wirkung sofort und halten mehrere Wochen an.' },
      { _key: 'p4', num: '04', title: 'Nachbehandlung', text: 'Tragen Sie nach 4–6 Wochen oder nach starkem Regen erneut auf für dauerhaften Schutz.' },
    ],
    faqTitle: 'Häufige Fragen zu Superexpel',
    faqs: [
      { _key: 'f1', question: 'Für welche Tiere ist Superexpel geeignet?', answer: 'Superexpel ist besonders wirksam gegen Marder, aber auch gegen andere Wildtiere wie Ratten, Mäuse und Katzen. Das Mittel stört die Tiere durch natürliche Duftstoffe, ohne ihnen zu schaden.' },
      { _key: 'f2', question: 'Ist Superexpel sicher für Kinder und Haustiere?', answer: 'Ja. Superexpel basiert auf natürlichen Inhaltsstoffen und ist bei bestimmungsgemäßer Anwendung sicher für Menschen und Haustiere. Vermeiden Sie trotzdem direkten Hautkontakt während der Anwendung.' },
      { _key: 'f3', question: 'Wie lange hält die Wirkung an?', answer: 'Bei trockenen Bedingungen hält die Wirkung 4 bis 6 Wochen an. Nach starkem Regen empfehlen wir eine frühere Nachbehandlung. Im Motorraum empfehlen wir alle 4 Wochen eine neue Anwendung.' },
      { _key: 'f4', question: 'Wo kann ich Superexpel kaufen?', answer: 'Superexpel ist direkt über ASV Pest Control erhältlich. Kontaktieren Sie uns für aktuelle Verfügbarkeit und Preise.' },
    ],
    ctaTitle: 'Interesse an Superexpel?',
    ctaText: 'Kontaktieren Sie uns für Verfügbarkeit, Preise und persönliche Beratung.',
  })
  console.log('✓ superexpelPage seeded')

  console.log('\nAll 6 singleton page documents seeded successfully.')
}

seed().catch(console.error)
