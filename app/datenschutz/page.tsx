import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutz',
}

export default function DatenschutzPage() {
  return (
    <>
      <nav className="legal-nav">
        <Link href="/" className="legal-nav__logo">Zurück zur Startseite</Link>
        <Link href="/" className="legal-nav__back">&larr; Zurück</Link>
      </nav>
      <div className="legal-content">
        <h1>Datenschutzerklärung</h1>
        <div className="divider"></div>

        <h2>1. Verantwortlicher</h2>
        <p>
          [Firmenname]<br />
          [Straße und Hausnummer]<br />
          [PLZ und Ort]<br />
          Vertreten durch: [Vor- und Nachname]<br />
          E-Mail: <a href="mailto:info@example.com">info@example.com</a>
        </p>

        <h2>2. Datenschutzbeauftragter</h2>
        <p>
          [Name des/der Datenschutzbeauftragten]<br />
          E-Mail: <a href="mailto:datenschutz@example.com">datenschutz@example.com</a>
        </p>

        <h2>3. Rechtsgrundlagen der Verarbeitung</h2>
        <p>Wir verarbeiten personenbezogene Daten auf Grundlage der folgenden Rechtsgrundlagen der DSGVO:</p>
        <ul>
          <li>Art. 6 Abs. 1 lit. a DSGVO — Einwilligung</li>
          <li>Art. 6 Abs. 1 lit. b DSGVO — Vertragserfüllung und vorvertragliche Maßnahmen</li>
          <li>Art. 6 Abs. 1 lit. c DSGVO — Rechtliche Verpflichtungen</li>
          <li>Art. 6 Abs. 1 lit. f DSGVO — Berechtigte Interessen</li>
        </ul>

        <h2>4. Datenübermittlung</h2>
        <p>Eine Übermittlung personenbezogener Daten an Dritte erfolgt nur im Rahmen der gesetzlichen Bestimmungen. Daten werden an Dienstleister und Auftragsverarbeiter auf Grundlage von Auftragsverarbeitungsverträgen weitergegeben.</p>

        <h2>5. Speicherdauer und Löschung</h2>
        <p>Personenbezogene Daten werden gelöscht, sobald der Zweck der Verarbeitung entfällt, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</p>

        <h2>6. Ihre Rechte</h2>
        <p>Sie haben das Recht auf:</p>
        <ul>
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
          <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
        </ul>

        <h2>7. Website-Hosting</h2>
        <p>Beim Besuch unserer Website werden automatisch Informationen erfasst, die Ihr Browser übermittelt (sog. Server-Logfiles). Diese Daten sind für die technische Bereitstellung der Website erforderlich und werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeitet.</p>

        <h2>8. Kontaktaufnahme</h2>
        <p>Wenn Sie uns per E-Mail, Telefon oder über ein Kontaktformular kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage verarbeitet und gespeichert (Art. 6 Abs. 1 lit. b DSGVO).</p>

        <h2>9. Google Maps</h2>
        <p>Wir binden Google Maps ein, um unseren Standort darzustellen. Anbieter ist die Google Ireland Limited. Beim Laden der Karte werden Daten an Google-Server übertragen. Weitere Informationen finden Sie in der <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Datenschutzerklärung von Google</a>.</p>
      </div>
    </>
  )
}
