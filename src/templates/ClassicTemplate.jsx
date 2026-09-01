import React from 'react'

export default function ClassicTemplate({ lang, data, photo, labels }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'
  const siblingLabel = lang === 'mr' ? 'भाऊ-बहीण' : 'Siblings'

  const renderField = (label, value) => {
    if (!value || !String(value).trim()) return null
    return (
      <div className="mb-2 text-sm">
        <span className="font-semibold text-gray-700 font-devanagari">{label}:</span>{' '}
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
        <h3 className="text-base font-bold text-purple-800 border-b-2 border-purple-300 pb-1 mb-2 font-devanagari">
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
    const valid = (data.siblings || []).filter(
      (s) => s.name || s.relation || s.maritalStatus
    )
    if (valid.length === 0) return null

    return (
      <div className="mb-4">
        <h3 className="text-base font-bold text-purple-800 border-b-2 border-purple-300 pb-1 mb-2 font-devanagari">
          {siblingLabel}
        </h3>
        {valid.map((s, i) => (
          <div key={i} className="mb-2 text-sm font-devanagari">
            <span className="font-semibold text-gray-700">
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
    <div className="p-8 font-devanagari text-gray-900" style={{ minHeight: '297mm' }}>
      <div className="border-4 border-double border-purple-700 p-6 h-full">
        <div className="text-center mb-5">
          <p className="text-purple-800 font-semibold text-lg tracking-wide">
            || ॐ गणेशाय नमः ||
          </p>
          <h1 className="text-2xl font-bold text-purple-900 mt-2">{title}</h1>
        </div>

        {photo && (
          <div className="flex justify-center mb-5">
            <img
              src={photo}
              alt="Profile"
              className="w-28 h-36 object-cover rounded border-2 border-purple-300 shadow-sm"
            />
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
  )
}
