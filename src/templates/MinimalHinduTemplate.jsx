import React from 'react'

export default function MinimalHinduTemplate({ lang, data, photo, labels }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'
  const siblingLabel = lang === 'mr' ? 'भाऊ-बहीण' : 'Siblings'

  const rows = (sectionKey) => {
    const sectionData = data[sectionKey]
    if (!sectionData) return []
    return Object.entries(sectionData)
      .filter(([, v]) => v && String(v).trim())
      .map(([field, value]) => ({
        label: labels[sectionKey]?.[field]?.[lang] || field,
        value,
      }))
  }

  const FieldTable = ({ items }) => (
    <div className="space-y-1.5">
      {items.map(({ label, value }, i) => (
        <div key={i} className="grid grid-cols-[140px_12px_1fr] gap-0 text-[13px] leading-relaxed">
          <span className="font-medium text-gray-600 font-devanagari">{label}</span>
          <span className="text-orange-500 text-center">:</span>
          <span className="text-gray-900 font-devanagari">{value}</span>
        </div>
      ))}
    </div>
  )

  const Section = ({ sectionKey }) => {
    const items = rows(sectionKey)
    if (items.length === 0) return null
    return (
      <div className="mb-4">
        <h3 className="text-[13px] font-bold text-orange-700 uppercase tracking-wide mb-2 flex items-center gap-2 font-devanagari">
          <span className="w-5 h-0.5 bg-orange-500"></span>
          {data.sectionTitles[sectionKey][lang]}
        </h3>
        <FieldTable items={items} />
      </div>
    )
  }

  const siblingItems = (data.siblings || [])
    .filter((s) => s.name || s.relation || s.maritalStatus)
    .map((s, i) => ({
      label: lang === 'mr' ? `भाऊ/बहीण ${i + 1}` : `Sibling ${i + 1}`,
      value: [s.name, s.relation, s.maritalStatus].filter(Boolean).join(' — '),
    }))

  return (
    <div className="p-7 font-devanagari text-gray-900 bg-white" style={{ minHeight: '297mm' }}>
      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mb-5"></div>

      <div className="text-center mb-5">
        <p className="text-orange-700 text-sm tracking-widest font-medium">ॐ</p>
        <h1 className="text-xl font-bold text-gray-900 mt-0.5">{title}</h1>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <Section sectionKey="personal" />
        </div>
        {photo && (
          <div className="flex-shrink-0">
            <img src={photo} alt="Profile" className="w-28 h-36 object-cover rounded-full border-2 border-orange-300 shadow-sm" />
          </div>
        )}
        </div>

      <Section sectionKey="family" />
      {siblingItems.length > 0 && (
        <div className="mb-4">
          <h3 className="text-[13px] font-bold text-orange-700 uppercase tracking-wide mb-2 flex items-center gap-2 font-devanagari">
            <span className="w-5 h-0.5 bg-orange-500"></span>
            {siblingLabel}
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
