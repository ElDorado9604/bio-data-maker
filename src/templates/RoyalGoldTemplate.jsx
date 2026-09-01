import React from 'react'
import { getSectionRows } from '../utils/fieldRows'

export default function RoyalGoldTemplate({ lang, data, labels, fontScale = 1 }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'
  const siblingLabel = lang === 'mr' ? 'भाऊ-बहीण' : 'Siblings'

  const rows = (sectionKey) => getSectionRows(data, labels, sectionKey, lang)

  const FieldTable = ({ items }) => (
    <div className="grid gap-x-1.5 gap-y-2 text-[0.95em] leading-snug" style={{ gridTemplateColumns: 'max-content auto 1fr' }}>
      {items.map(({ label, value }, i) => (
        <React.Fragment key={i}>
          <span className="font-medium text-amber-900 font-devanagari">{label}</span>
          <span className="text-amber-600 text-center">:</span>
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
        <h3 className="text-[1.05em] font-bold text-amber-900 border-b-2 border-amber-500 pb-1 mb-2 font-devanagari">
          {data.sectionTitles[sectionKey][lang]}
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
    <div className="p-5 font-devanagari text-gray-900 bg-[#fffdf5]" style={{ minHeight: '297mm' }}>
      <div className="border-[6px] border-double border-amber-600 p-4 h-full relative">
        <div className="absolute top-2 left-2 text-amber-600 text-lg">❖</div>
        <div className="absolute top-2 right-2 text-amber-600 text-lg">❖</div>
        <div className="absolute bottom-2 left-2 text-amber-600 text-lg">❖</div>
        <div className="absolute bottom-2 right-2 text-amber-600 text-lg">❖</div>
        <div className="text-center mb-4">
          <p className="text-amber-800 font-semibold tracking-widest text-[0.9em]">|| ॐ गणेशाय नमः ||</p>
          <h1 className="text-[1.2em] font-bold text-amber-950 mt-1">{title}</h1>
          <div className="w-28 h-0.5 bg-amber-500 mx-auto mt-1.5"></div>
        </div>
        <Section sectionKey="personal" />
        <Section sectionKey="family" />
        {siblingItems.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[1.05em] font-bold text-amber-900 border-b-2 border-amber-500 pb-1 mb-2 font-devanagari">{siblingLabel}</h3>
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
