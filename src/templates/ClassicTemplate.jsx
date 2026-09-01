import React from 'react'
import { getSectionRows } from '../utils/fieldRows'

export default function ClassicTemplate({ lang, data, photo, labels, fontScale = 1 }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'
  const siblingLabel = lang === 'mr' ? 'भाऊ-बहीण' : 'Siblings'

  const rows = (sectionKey) => getSectionRows(data, labels, sectionKey, lang)

  const FieldTable = ({ items }) => (
    <div
      className="grid gap-x-1.5 gap-y-2 text-[0.95em] leading-snug"
      style={{ gridTemplateColumns: 'max-content auto 1fr' }}
    >
      {items.map(({ label, value }, i) => (
        <React.Fragment key={i}>
          <span className="font-medium text-gray-700 font-devanagari">{label}</span>
          <span className="text-gray-500 text-center">:</span>
          <span className="text-gray-900 font-devanagari">{value}</span>
        </React.Fragment>
      ))}
    </div>
  )

  const Section = ({ sectionKey, color = 'text-purple-800', border = 'border-purple-300' }) => {
    const items = rows(sectionKey)
    if (items.length === 0) return null
    return (
      <div className="mb-5">
        <h3 className={`text-[1.05em] font-bold ${color} border-b ${border} pb-1 mb-2 font-devanagari`}>
          {data.sectionTitles[sectionKey][lang]}
        </h3>
        <FieldTable items={items} />
      </div>
    )
  }

  const siblingItems = (data.siblings || [])
    .filter((s) => s.name || s.relation || s.maritalStatus)
    .map((s, i) => {
      const label =
        (s.relation && s.relation.trim()) ||
        (lang === 'mr' ? `भाऊ/बहीण ${i + 1}` : `Sibling ${i + 1}`)
      const value = [s.name, s.maritalStatus].filter(Boolean).join(' — ')
      return { label, value: value || '—' }
    })

  return (
    <div className="p-7 font-devanagari text-gray-900" style={{ minHeight: '297mm' }}>
      <div className="border-4 border-double border-purple-700 p-5 h-full">
        <div className="text-center mb-4">
          <p className="text-purple-800 font-semibold tracking-wide text-[0.95em]">
            || ॐ गणेशाय नमः ||
          </p>
          <h1 className="text-[1.25em] font-bold text-purple-900 mt-1">{title}</h1>
        </div>

        <div className="mb-4 overflow-hidden">
          {photo && (
            <img
              src={photo}
              alt="Profile"
              className="float-right ml-3 mb-3 w-28 h-36 object-cover rounded border-2 border-purple-300 shadow-sm"
            />
          )}
          <Section sectionKey="personal" />
          <div className="clear-both" />
        </div>

        <Section sectionKey="family" />

        {siblingItems.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[1.05em] font-bold text-purple-800 border-b border-purple-300 pb-1 mb-2 font-devanagari">
              {siblingLabel}
            </h3>
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
