import React from 'react'
import { getSectionRows } from '../utils/fieldRows'

export default function MinimalHinduTemplate({ lang, data, photo, photoSize = 'md', labels, fontScale = 1 }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'
  const siblingLabel = lang === 'mr' ? 'भाऊ-बहीण' : 'Siblings'
  const photoClass = ({ sm: 'w-20 h-28', md: 'w-28 h-36', lg: 'w-36 h-44' }[photoSize] || 'w-28 h-36')

  const rows = (sectionKey) => getSectionRows(data, labels, sectionKey, lang)

  const FieldTable = ({ items }) => (
    <div className="grid gap-x-1.5 gap-y-2 text-[0.95em] leading-snug" style={{ gridTemplateColumns: 'max-content auto 1fr' }}>
      {items.map(({ label, value }, i) => (
        <React.Fragment key={i}>
          <span className="font-medium text-gray-600 font-devanagari">{label}</span>
          <span className="text-orange-500 text-center">:</span>
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
        <h3 className="text-[0.95em] font-bold text-orange-700 uppercase tracking-wide mb-2 flex items-center gap-2 font-devanagari">
          <span className="w-5 h-0.5 bg-orange-500"></span>
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
    <div className="p-7 font-devanagari text-gray-900 bg-white" style={{ minHeight: '297mm' }}>
      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mb-5"></div>
      <div className="text-center mb-5">
        <p className="text-orange-700 text-[0.9em] tracking-widest font-medium">ॐ</p>
        <h1 className="text-[1.2em] font-bold text-gray-900 mt-0.5">{title}</h1>
      </div>
      <div className="mb-4 overflow-hidden">
        {photo && (
          <img src={photo} alt="Profile" className={`float-right ml-3 mb-3 ${photoClass} object-cover rounded-full border-2 border-orange-300 shadow-sm`} />
        )}
        <Section sectionKey="personal" />
        <div className="clear-both" />
      </div>
      <Section sectionKey="family" />
      {siblingItems.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[0.95em] font-bold text-orange-700 uppercase tracking-wide mb-2 flex items-center gap-2 font-devanagari">
            <span className="w-5 h-0.5 bg-orange-500"></span>{siblingLabel}
          </h3>
          <FieldTable items={siblingItems} />
        </div>
      )}
      <Section sectionKey="education" />
      <Section sectionKey="horoscope" />
      <Section sectionKey="expectations" />
      <Section sectionKey="contact" />
      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mt-6"></div>
    </div>
  )
}
