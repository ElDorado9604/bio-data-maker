import React from 'react'
import { getSectionRows } from '../utils/fieldRows'

export default function FloralTemplate({ lang, data, labels, fontScale = 1 }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'
  const siblingLabel = lang === 'mr' ? 'भाऊ-बहीण' : 'Siblings'

  const rows = (sectionKey) => getSectionRows(data, labels, sectionKey, lang)

  const FieldTable = ({ items }) => (
    <div className="grid gap-x-1.5 gap-y-2 text-[0.95em] leading-snug" style={{ gridTemplateColumns: 'max-content auto 1fr' }}>
      {items.map(({ label, value }, i) => (
        <React.Fragment key={i}>
          <span className="font-medium text-fuchsia-900 font-devanagari">{label}</span>
          <span className="text-fuchsia-500 text-center">:</span>
          <span className="text-gray-900 font-devanagari">{value}</span>
        </React.Fragment>
      ))}
    </div>
  )

  const Section = ({ sectionKey }) => {
    const items = rows(sectionKey)
    if (items.length === 0) return null
    return (
      <div className="mb-5">
        <h3 className="text-[1.05em] font-bold text-fuchsia-800 border-b border-fuchsia-300 pb-1 mb-2 font-devanagari">
          ✿ {data.sectionTitles[sectionKey][lang]}
        </h3>
        <FieldTable items={items} />
      </div>
    )
  }

  const siblingItems = (data.siblings || [])
    .filter((s) => s.name || s.relation || s.maritalStatus)
    .map((s, i) => {
      const label = (s.relation && s.relation.trim()) || (lang === 'mr' ? `भाऊ/बहीण ${i + 1}` : `Sibling ${i + 1}`)
      const value = [s.name, s.maritalStatus].filter(Boolean).join(' — ')
      return { label, value: value || '—' }
    })

  return (
    <div className="p-5 font-devanagari text-gray-900 bg-gradient-to-br from-fuchsia-50 to-purple-50" style={{ minHeight: '297mm' }}>
      <div className="border-2 border-fuchsia-400 rounded-lg p-4 h-full relative">
        <div className="absolute -top-2.5 -left-1 text-fuchsia-500 text-xl">✿</div>
        <div className="absolute -top-2.5 -right-1 text-fuchsia-500 text-xl">✿</div>
        <div className="absolute -bottom-2.5 -left-1 text-fuchsia-500 text-xl">✿</div>
        <div className="absolute -bottom-2.5 -right-1 text-fuchsia-500 text-xl">✿</div>
        <div className="text-center mb-4">
          <p className="text-fuchsia-800 font-semibold text-[0.9em]">|| ॐ गणेशाय नमः ||</p>
          <h1 className="text-[1.2em] font-bold text-fuchsia-950 mt-0.5">{title}</h1>
        </div>
        <Section sectionKey="personal" />
        <Section sectionKey="family" />
        {siblingItems.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[1.05em] font-bold text-fuchsia-800 border-b border-fuchsia-300 pb-1 mb-2 font-devanagari">✿ {siblingLabel}</h3>
            <FieldTable items={siblingItems} />
          </div>
        )}
        <Section sectionKey="education" />
        <Section sectionKey="horoscope" />
        <Section sectionKey="expectations" />
        <Section sectionKey="contact" />
      </div>
    </div>
  )
}
