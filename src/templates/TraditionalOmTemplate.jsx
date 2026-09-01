import React from 'react'

export default function TraditionalOmTemplate({ lang, data, photo, labels }) {
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
          <span className="font-medium text-red-900 font-devanagari">{label}</span>
          <span className="text-amber-700 text-center">:</span>
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
        <h3 className="text-[15px] font-bold text-red-900 border-b border-amber-600 pb-1 mb-2 font-devanagari flex items-center gap-2">
          <span className="text-amber-600">✦</span> {data.sectionTitles[sectionKey][lang]}
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
    <div className="p-5 font-devanagari text-gray-900 bg-amber-50" style={{ minHeight: '297mm' }}>
      <div className="border-4 border-red-900 p-1 h-full">
        <div className="border-2 border-amber-600 p-4 h-full">
          <div className="text-center mb-4 relative">
            <div className="text-4xl text-red-900 font-bold">ॐ</div>
            <p className="text-red-900 font-semibold tracking-widest text-xs">|| श्री गणेशाय नमः ||</p>
            <h1 className="text-xl font-bold text-red-950 mt-1">{title}</h1>
            <div className="absolute top-0 left-0 text-amber-600 text-xl">✦</div>
            <div className="absolute top-0 right-0 text-amber-600 text-xl">✦</div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <Section sectionKey="personal" />
            </div>
            {photo && (
              <div className="flex-shrink-0">
                <img src={photo} alt="Profile" className="w-28 h-36 object-cover border-2 border-red-800 shadow" />
              </div>
            )}
          </div>

          <Section sectionKey="family" />
          {siblingItems.length > 0 && (
            <div className="mb-4">
              <h3 className="text-[15px] font-bold text-red-900 border-b border-amber-600 pb-1 mb-2 font-devanagari flex items-center gap-2">
                <span className="text-amber-600">✦</span> {siblingLabel}
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
    </div>
  )
}
