import React from 'react'

export default function RoyalGoldTemplate({ lang, data, photo, labels, fontScale = 1 }) {
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
        <div key={i} className="grid grid-cols-[auto_8px_1fr] gap-x-1 text-[0.95em] leading-snug">
          <span className="font-medium text-amber-900 font-devanagari whitespace-nowrap">{label}</span>
          <span className="text-amber-600 text-center">:</span>
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
      const label =
        (s.relation && s.relation.trim()) ||
        (lang === 'mr' ? `भाऊ/बहीण ${i + 1}` : `Sibling ${i + 1}`)
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
        <div className="mb-4 overflow-hidden">
          {photo && (
            <img
              src={photo}
              alt="Profile"
              className="float-right ml-3 mb-3 w-28 h-36 object-cover border-2 border-amber-600 shadow"
            />
          )}
          <Section sectionKey="personal" />
          <div className="clear-both" />
        </div>
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
