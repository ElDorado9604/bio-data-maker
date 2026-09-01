import React from 'react'

export default function ModernTemplate({ lang, data, photo, labels, fontScale = 1 }) {
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
      <div className="mb-5">
        <h3 className="text-[0.95em] font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1.5 rounded mb-2 font-devanagari">
          {data.sectionTitles[sectionKey][lang]}
        </h3>
        <div className="px-1"><FieldTable items={items} /></div>
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
    <div className="font-devanagari text-gray-900" style={{ minHeight: '297mm' }}>
      <div className="h-14 bg-gradient-to-r from-purple-700 via-violet-600 to-purple-700 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400"></div>
        <div className="h-full flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-[0.8em] font-medium tracking-wider">|| ॐ गणेशाय नमः ||</p>
            <h1 className="text-[1.15em] font-bold">{title}</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 overflow-hidden">
          {photo && (
            <img
              src={photo}
              alt="Profile"
              className="float-right ml-4 mb-2 w-28 h-36 object-cover rounded-lg border-2 border-purple-200 shadow"
            />
          )}
          <Section sectionKey="personal" />
          <div className="clear-both" />
        </div>
        <Section sectionKey="family" />
        {siblingItems.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[0.95em] font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1.5 rounded mb-2 font-devanagari">{siblingLabel}</h3>
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
