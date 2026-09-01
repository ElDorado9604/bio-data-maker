import React from 'react'

export default function ClassicTemplate({ lang, data, photo, labels }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'

  const renderSection = (sectionKey) => {
    const sectionData = data[sectionKey]
    const titleObj = data.sectionTitles[sectionKey]
    const fields = Object.entries(sectionData).filter(([, v]) => v && v.trim())
    if (fields.length === 0) return null

    return (
      <div key={sectionKey} className="mb-4">
        <h3 className="text-base font-bold text-purple-800 border-b-2 border-purple-300 pb-1 mb-2 font-devanagari">
          {titleObj[lang]}
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          {fields.map(([field, value]) => (
            <div key={field} className={['about', 'siblings', 'kundaliNotes', 'otherExpectations', 'address'].includes(field) ? 'col-span-2' : ''}>
              <span className="font-semibold text-gray-700 font-devanagari">
                {labels[sectionKey][field]?.[lang] || field}:
              </span>{' '}
              <span className="text-gray-800 font-devanagari">{value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 font-devanagari text-gray-900" style={{ minHeight: '297mm' }}>
      <div className="border-4 border-double border-purple-700 p-6 h-full">
        <div className="text-center mb-6">
          <p className="text-purple-800 font-semibold text-lg tracking-wide">
            || ॐ गणेशाय नमः ||
          </p>
          <h1 className="text-2xl font-bold text-purple-900 mt-2">{title}</h1>
        </div>

        <div className="flex gap-6 mb-6 items-start">
          {photo && (
            <img
              src={photo}
              alt="Profile"
              className="w-32 h-40 object-cover rounded border-2 border-purple-300 shadow-sm flex-shrink-0"
            />
          )}
          <div className="flex-1">
            {data.personal.fullName && (
              <h2 className="text-xl font-bold text-purple-900 mb-1">
                {data.personal.fullName}
              </h2>
            )}
            <div className="text-sm space-y-1">
              {data.personal.dob && <p><span className="font-semibold">{labels.personal.dob[lang]}:</span> {data.personal.dob}</p>}
              {data.personal.height && <p><span className="font-semibold">{labels.personal.height[lang]}:</span> {data.personal.height}</p>}
              {data.personal.religion && <p><span className="font-semibold">{labels.personal.religion[lang]}:</span> {data.personal.religion}{data.personal.caste ? ` / ${data.personal.caste}` : ''}</p>}
            </div>
          </div>
        </div>

        {['personal', 'family', 'education', 'horoscope', 'expectations', 'contact'].map(renderSection)}
      </div>
    </div>
  )
}
