interface TrustItem {
  number: string
  label: string
}

const DEFAULT_ITEMS: TrustItem[] = [
  { number: '30+', label: 'Jahre Erfahrung' },
  { number: '20.000+', label: 'Zufriedene Kunden' },
  { number: '24h', label: 'Notdienst' },
  { number: 'IHK', label: 'Zertifiziert' },
]

export default function AsvTrustBar({ items = DEFAULT_ITEMS }: { items?: TrustItem[] }) {
  return (
    <section className="asv-trust-bar">
      <div className="asv-container">
        <div className="asv-trust-bar__items">
          {items.map((item, i) => (
            <div key={i} className="asv-trust-bar__item">
              <span className="asv-trust-bar__number">{item.number}</span>
              <span className="asv-trust-bar__label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
