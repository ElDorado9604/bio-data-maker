import React from 'react'

export default function ClassicTemplate({ lang, data, photo, labels, fontScale = 1 }) {
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
    <div className="space-y-2">
      {items.map(({ label, value }, i) => (
        <div key={i} className="grid grid-cols-[minmax(110px,38%)_10px_1fr] gap-0 text-[0.95em] leading-snug">
          <span className="font-medium text-gray-700 font-devanagari">{label}</span>
          <span className="text-gray-500 text-center">:</span>
          <span className="text-gray-900 font-devanagari">{value}</span>
        </div>
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

        <div className="flex gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <Section sectionKey="personal" />
          </div>
          {photo && (
            <div className="flex-shrink-0">
              <img
                src={photo}
                alt="Profile"
                className="w-28 h-36 object-cover rounded border-2 border-purple-300 shadow-sm"
              />
            </div>
          )}
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
