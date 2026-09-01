import React from 'react'

export default function MinimalHinduTemplate({ lang, data, photo, labels }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'

  const renderSection = (sectionKey) => {
    const sectionData = data[sectionKey]
    const titleObj = data.sectionTitles[sectionKey]
    const fields = Object.entries(sectionData).filter(([, v]) => v && v.trim())
    if (fields.length === 0) return null

    return (
      <div key={sectionKey} className="mb-5">
        <h3 className="text-sm font-bold text-orange-700 uppercase tracking-wide mb-2 flex items-center gap-2 font-devanagari">
          <span className="w-6 h-0.5 bg-orange-500"></span>
          {titleObj[lang]}
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          {fields.map(([field, value]) => (
            <div key={field} className={['about', 'siblings', 'kundaliNotes', 'otherExpectations', 'address'].includes(field) ? 'col-span-2' : ''}>
              <span className="font-medium text-gray-600 font-devanagari">
                {labels[sectionKey][field]?.[lang] || field}
              </span>
              <div className="text-gray-900 font-devanagari">{value}</div>
            </div>
          ))}
        </div>
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

      <div className="flex gap-6 mb-6 items-start">
        {photo && (
          <img src={photo} alt="Profile" className="w-28 h-36 object-cover rounded-full border-2 border-orange-300 shadow-sm flex-shrink-0" />
        )}
        <div className="flex-1 pt-2">
          {data.personal.fullName && (
            <h2 className="text-xl font-bold text-gray-900 mb-2">{data.personal.fullName}</h2>
          )}
          <div className="text-sm text-gray-700 space-y-0.5">
            {data.personal.dob && <p>{data.personal.dob}</p>}
            {data.personal.height && <p>{data.personal.height}</p>}
            {(data.personal.religion || data.personal.caste) && (
              <p>{[data.personal.religion, data.personal.caste].filter(Boolean).join(' • ')}</p>
            )}
          </div>
        </div>
      </div>

      {['personal', 'family', 'education', 'horoscope', 'expectations', 'contact'].map(renderSection)}

      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mt-8"></div>
    </div>
  )
}
