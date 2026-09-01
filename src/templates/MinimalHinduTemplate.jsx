import React from 'react'

export default function MinimalHinduTemplate({ lang, data, photo, labels }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'
  const siblingLabel = lang === 'mr' ? 'भाऊ-बहीण' : 'Siblings'

  const renderField = (label, value) => {
    if (!value || !String(value).trim()) return null
    return (
      <div className="mb-2.5 text-sm">
        <div className="font-medium text-gray-600 font-devanagari text-xs">{label}</div>
        <div className="text-gray-900 font-devanagari">{value}</div>
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
      <div key={sectionKey} className="mb-5">
        <h3 className="text-sm font-bold text-orange-700 uppercase tracking-wide mb-2 flex items-center gap-2 font-devanagari">
          <span className="w-6 h-0.5 bg-orange-500"></span>
          {titleObj[lang]}
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
      <div className="mb-5">
        <h3 className="text-sm font-bold text-orange-700 uppercase tracking-wide mb-2 flex items-center gap-2 font-devanagari">
          <span className="w-6 h-0.5 bg-orange-500"></span>
          {siblingLabel}
        </h3>
        {valid.map((s, i) => (
          <div key={i} className="mb-2.5 text-sm font-devanagari">
            <div className="font-medium text-gray-600 text-xs">
              {lang === 'mr' ? `भाऊ/बहीण ${i + 1}` : `Sibling ${i + 1}`}
            </div>
            <div className="text-gray-900">
              {[s.name, s.relation, s.maritalStatus].filter(Boolean).join(' — ')}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-8 font-devanagari text-gray-900 bg-white" style={{ minHeight: '297mm' }}>
      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mb-6"></div>

      <div className="text-center mb-6">
        <p className="text-orange-700 text-sm tracking-widest font-medium">ॐ</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">{title}</h1>
      </div>

      {photo && (
        <div className="flex justify-center mb-6">
          <img src={photo} alt="Profile" className="w-28 h-36 object-cover rounded-full border-2 border-orange-300 shadow-sm" />
        </div>
      )}

      {renderSection('personal')}
      {renderSection('family')}
      {renderSiblings()}
      {renderSection('education')}
      {renderSection('horoscope')}
      {renderSection('expectations')}
      {renderSection('contact')}

      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mt-8"></div>
    </div>
  )
}
