import React from 'react'

export default function ModernTemplate({ lang, data, photo, labels }) {
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
          <span className="font-medium text-purple-900 font-devanagari">{label}</span>
          <span className="text-gray-500 text-center">:</span>
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
        <h3 className="text-[13px] font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1.5 rounded mb-2 font-devanagari">
          {data.sectionTitles[sectionKey][lang]}
        </h3>
        <div className="px-1">
          <FieldTable items={items} />
        </div>
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
    <div className="font-devanagari text-gray-900" style={{ minHeight: '297mm' }}>
      <div className="h-14 bg-gradient-to-r from-purple-700 via-violet-600 to-purple-700 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400"></div>
        <div className="h-full flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-xs font-medium tracking-wider">|| ॐ गणेशाय नमः ||</p>
            <h1 className="text-lg font-bold">{title}</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <Section sectionKey="personal" />
          </div>
          {photo && (
            <div className="flex-shrink-0 pt-1">
              <img src={photo} alt="Profile" className="w-28 h-36 object-cover rounded-lg border-2 border-purple-200 shadow" />
            </div>
          )}
        </div>

        <Section sectionKey="family" />
        {siblingItems.length > 0 && (
          <div className="mb-4">
            <h3 className="text-[13px] font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1.5 rounded mb-2 font-devanagari">
              {siblingLabel}
            </h3>
            <div className="px-1"><FieldTable items={siblingItems} /></div>
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
