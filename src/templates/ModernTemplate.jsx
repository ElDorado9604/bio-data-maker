import React from 'react'

export default function ModernTemplate({ lang, data, photo, labels }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'
  const siblingLabel = lang === 'mr' ? 'भाऊ-बहीण' : 'Siblings'

  const renderField = (label, value) => {
    if (!value || !String(value).trim()) return null
    return (
      <div className="mb-2 text-sm">
        <span className="font-semibold text-purple-800 font-devanagari">{label}:</span>{' '}
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
        <h3 className="text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1.5 rounded-md mb-2 font-devanagari">
          {titleObj[lang]}
        </h3>
        <div className="px-1">
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
        <h3 className="text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1.5 rounded-md mb-2 font-devanagari">
          {siblingLabel}
        </h3>
        <div className="px-1">
          {valid.map((s, i) => (
            <div key={i} className="mb-2 text-sm font-devanagari">
              <span className="font-semibold text-purple-800">
                {lang === 'mr' ? `भाऊ/बहीण ${i + 1}` : `Sibling ${i + 1}`}:
              </span>{' '}
              <span className="text-gray-800">
                {[s.name, s.relation, s.maritalStatus].filter(Boolean).join(' — ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="font-devanagari text-gray-900" style={{ minHeight: '297mm' }}>
      <div className="h-16 bg-gradient-to-r from-purple-700 via-violet-600 to-purple-700 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400"></div>
        <div className="h-full flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-sm font-medium tracking-wider">|| ॐ गणेशाय नमः ||</p>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        </div>
      </div>

      <div className="p-7">
        {photo && (
          <div className="flex justify-center mb-5">
            <img
              src={photo}
              alt="Profile"
              className="w-28 h-36 object-cover rounded-lg border-2 border-purple-200 shadow"
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
