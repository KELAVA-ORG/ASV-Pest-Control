import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum',
}

export default function ImpressumPage() {
  return (
    <>
      <nav className="legal-nav">
        <Link href="/" className="legal-nav__logo">Zurück zur Startseite</Link>
        <Link href="/" className="legal-nav__back">&larr; Zurück</Link>
      </nav>
      <div className="legal-content">
        <h1>Impressum</h1>
        <div className="divider"></div>

        <h2>Angaben gemäß &sect; 5 TMG</h2>
        <p>
          [Firmenname]<br />
          [Straße und Hausnummer]<br />
          [PLZ und Ort]
        </p>

        <h2>Vertreten durch</h2>
        <p>[Geschäftsführer/in: Vor- und Nachname]</p>

        <h2>Kontakt</h2>
        <p>
          Telefon: [Telefonnummer]<br />
          E-Mail: <a href="mailto:info@example.com">info@example.com</a>
        </p>

        <h2>Registereintrag</h2>
        <p>
          Eintragung im Handelsregister<br />
          Registergericht: [Ort]<br />
          Registernummer: [HRB-Nummer]
        </p>

        <h2>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a>
        </p>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </div>
    </>
  )
}
