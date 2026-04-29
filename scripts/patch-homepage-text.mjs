import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'z59ogw16',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

console.log('\n═══ PATCHING HOMEPAGE TEXT TO MATCH ORIGINAL SITE ═══\n')

await client.patch('homePage').set({

  // ── Hero ─────────────────────────────────────────────────────────────────
  heroSubtitle: 'Seit über 30 Jahren schützen wir Ihr Zuhause und Ihr Unternehmen – schnell, diskret und nachhaltig wirksam.',

  // ── Trust Stats ──────────────────────────────────────────────────────────
  trustStats: [
    { _key: 'stat1', num: '30+',     label: 'Jahre Erfahrung'   },
    { _key: 'stat2', num: '20.000+', label: 'Zufriedene Kunden' },
    { _key: 'stat3', num: '24h',     label: 'Notdienst'         },
    { _key: 'stat4', num: 'IHK',     label: 'Zertifiziert'      },
  ],

  // ── Taubenabwehr Teaser ───────────────────────────────────────────────────
  taubenTitle: 'Professionelle Taubenabwehr',
  taubenText: [
    {
      _type: 'block',
      _key: 'taubenBlock1',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'taubenSpan1',
          text: 'Tauben verursachen erhebliche Schäden an Gebäuden und stellen ein ernstes Gesundheitsrisiko dar. Ihre Exkremente beschädigen Fassaden, Dächer und technische Anlagen. Dazu übertragen Tauben Krankheitserreger und Parasiten.',
          marks: [],
        },
      ],
    },
    {
      _type: 'block',
      _key: 'taubenBlock2',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'taubenSpan2',
          text: 'ASV Pest Control bietet dauerhaft wirksame Taubenabwehr mit Spikesystemen, Netzen, Vogelschutzdrähten und elektrischen Abwehrsystemen – individuell auf Ihr Gebäude abgestimmt und fachgerecht montiert.',
          marks: [],
        },
      ],
    },
  ],
  taubenChecklist: [
    'Spikesysteme & Taubennetze',
    'Elektrische Abwehrsysteme',
    'Vogelschutzdrähte & -folien',
    'IHK-zertifizierte Montage',
    'Dauerhaft und tierschutzkonform',
  ],

  // ── Prozess ───────────────────────────────────────────────────────────────
  processTitle: 'So arbeiten wir',
  processSteps: [
    {
      _key: 'step1',
      num: '01',
      title: 'Kontakt aufnehmen',
      text: 'Rufen Sie uns an oder fordern Sie online Ihr kostenloses Express-Angebot an. Wir melden uns innerhalb von 2 Stunden.',
    },
    {
      _key: 'step2',
      num: '02',
      title: 'Inspektion vor Ort',
      text: 'Unser Experte kommt zu Ihnen und analysiert den Befall. Schnell, diskret und ohne versteckte Kosten.',
    },
    {
      _key: 'step3',
      num: '03',
      title: 'Bekämpfung',
      text: 'Wir bekämpfen den Schädlingsbefall mit modernsten Methoden – wirksam, sicher und nachhaltig.',
    },
    {
      _key: 'step4',
      num: '04',
      title: 'Nachkontrolle',
      text: 'Nach der Behandlung kommen wir zur Erfolgskontrolle zurück und stellen den dauerhaften Erfolg sicher.',
    },
  ],

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faqTitle: 'FAQ',
  faqs: [
    {
      _key: 'faq1',
      question: 'Wie schnell können Sie bei einem Schädlingsbefall helfen?',
      answer: [
        {
          _type: 'block',
          _key: 'faq1a',
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: 'faq1a1', text: 'Bei akutem Befall sind wir in der Regel innerhalb von 24 Stunden bei Ihnen. Für Notfälle bieten wir einen 24h-Notdienst an – auch am Wochenende und an Feiertagen.', marks: [] }],
        },
      ],
    },
    {
      _key: 'faq2',
      question: 'Sind die eingesetzten Mittel für Menschen und Haustiere sicher?',
      answer: [
        {
          _type: 'block',
          _key: 'faq2a',
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: 'faq2a1', text: 'Ja. Wir setzen ausschließlich zugelassene Mittel ein und informieren Sie vorab über alle notwendigen Sicherheitsvorkehrungen. Unsere Techniker erklären Ihnen genau, was zu tun ist – und wann Sie Ihre Räume wieder normal nutzen können.', marks: [] }],
        },
      ],
    },
    {
      _key: 'faq3',
      question: 'Was kostet ein Einsatz?',
      answer: [
        {
          _type: 'block',
          _key: 'faq3a',
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: 'faq3a1', text: 'Die Kosten hängen von der Art des Befalls, dem Ausmaß und dem Aufwand ab. Die Erstberatung und das Angebot sind kostenlos. Wir erstellen Ihnen ein transparentes Angebot – ohne versteckte Kosten.', marks: [] }],
        },
      ],
    },
    {
      _key: 'faq4',
      question: 'Kommen Sie auch in Privathaushalte?',
      answer: [
        {
          _type: 'block',
          _key: 'faq4a',
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: 'faq4a1', text: 'Ja, wir sind für Privatkunden genauso tätig wie für Unternehmen, Gastronomie, Industrie und Kommunen. Jeder Einsatz wird diskret und professionell durchgeführt.', marks: [] }],
        },
      ],
    },
    {
      _key: 'faq5',
      question: 'Sind Sie IHK-zertifiziert?',
      answer: [
        {
          _type: 'block',
          _key: 'faq5a',
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: 'faq5a1', text: 'Ja. Alle unsere Schädlingsbekämpfer sind IHK-zertifiziert und regelmäßig weitergebildet. Das garantiert Ihnen höchste fachliche Kompetenz und rechtssichere Durchführung gemäß den gesetzlichen Vorschriften.', marks: [] }],
        },
      ],
    },
  ],

}).commit()

console.log('✅ homePage patched successfully')
console.log('\n🎉 Homepage-Text aktualisiert!\n')
