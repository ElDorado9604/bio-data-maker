import React from 'react'

export default function TraditionalOmTemplate({ lang, data, photo, labels }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'
  const siblingLabel = lang === 'mr' ? 'भाऊ-बहीण' : 'Siblings'

  const renderField = (label, value) => {
    if (!value || !String(value).trim()) return null
    return (
      <div className="mb-2 text-sm">
        <span className="font-semibold text-red-900 font-devanagari">{label}:</span>{' '}
        <span className="text-gray-800 font-devanagari">{value}</span>
      </div>
    )
  }

  const renderSection = (sectionKey) => {
    const sectionData = data[sectionKey]
    if (!sectionData) return null
    const titleObj = data.sectionTitles[sectionKey]
    const fields = Object.entries(sectionData).filter(([, v]) => v && String(v).trim())
    if (fields.length === 0) return null
    return (
      <div key={sectionKey} className="mb-4">
        <h3 className="text-base font-bold text-red-900 border-b border-amber-600 pb-1 mb-2 font-devanagari flex items-center gap-2">
          <span className="text-amber-600">✦</span> {titleObj[lang]}
        </h3>
        <div>
          {fields.map(([field, value]) =>
            renderField(labels[sectionKey][field]?.[lang] || field, value)
          )}
        </div>
      </div>
    )
  }

  const renderSiblings = () => {
    const valid = (data.siblings || []).filter((s) => s.name || s.relation || s.maritalStatus)
    if (valid.length === 0) return null
    return (
      <div className="mb-4">
        <h3 className="text-base font-bold text-red-900 border-b border-amber-600 pb-1 mb-2 font-devanagari flex items-center gap-2">
          <span className="text-amber-600">✦</span> {siblingLabel}
        </h3>
        {valid.map((s, i) => (
          <div key={i} className="mb-2 text-sm font-devanagari">
            <span className="font-semibold text-red-900">
              {lang === 'mr' ? `भाऊ/बहीण ${i + 1}` : `Sibling ${i + 1}`}:
            </span>{' '}
            <span className="text-gray-800">
              {[s.name, s.relation, s.maritalStatus].filter(Boolean).join(' — ')}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-6 font-devanagari text-gray-900 bg-amber-50" style={{ minHeight: '297mm' }}>
      <div className="border-4 border-red-900 p-1 h-full">
        <div className="border-2 border-amber-600 p-5 h-full">
          <div className="text-center mb-5 relative">
            <div className="text-5xl text-red-900 font-bold mb-1">ॐ</div>
            <p className="text-red-900 font-semibold tracking-widest text-sm">
              || श्री गणेशाय नमः ||
            </p>
            <h1 className="text-2xl font-bold text-red-950 mt-2">{title}</h1>
            <div className="absolute top-0 left-0 text-amber-600 text-2xl">✦</div>
            <div className="absolute top-0 right-0 text-amber-600 text-2xl">✦</div>
          </div>

          {photo && (
            <div className="flex justify-center mb-5">
              <img src={photo} alt="Profile" className="w-28 h-36 object-cover border-2 border-red-800 shadow" />
            </div>
          )}

          {renderSection('personal')}
          {renderSection('family')}
          {renderSiblings()}
          {renderSection('education')}
          {renderSection('horoscope')}
          {renderSection('expectations')}
          {renderSection('contact')}
        </div>
      </div>
    </div>
  )
}
