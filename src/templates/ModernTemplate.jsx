import React from 'react'

export default function ModernTemplate({ lang, data, photo, labels }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'

  const renderSection = (sectionKey) => {
    const sectionData = data[sectionKey]
    const titleObj = data.sectionTitles[sectionKey]
    const fields = Object.entries(sectionData).filter(([, v]) => v && v.trim())
    if (fields.length === 0) return null

    return (
      <div key={sectionKey} className="mb-4">
        <h3 className="text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1.5 rounded-md mb-2 font-devanagari">
          {titleObj[lang]}
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm px-1">
          {fields.map(([field, value]) => (
            <div key={field} className={['about', 'siblings', 'kundaliNotes', 'otherExpectations', 'address'].includes(field) ? 'col-span-2' : ''}>
              <span className="font-semibold text-purple-800 font-devanagari">
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
        <div className="flex gap-5 mb-5 items-start">
          {photo && (
            <img
              src={photo}
              alt="Profile"
              className="w-28 h-36 object-cover rounded-lg border-2 border-purple-200 shadow flex-shrink-0"
            />
          )}
          <div className="flex-1 pt-1">
            {data.personal.fullName && (
              <h2 className="text-xl font-bold text-purple-900 mb-2">
                {data.personal.fullName}
              </h2>
            )}
            <div className="text-sm space-y-1 text-gray-700">
              {data.personal.dob && <p>{labels.personal.dob[lang]}: {data.personal.dob}</p>}
              {data.personal.height && <p>{labels.personal.height[lang]}: {data.personal.height}</p>}
              {(data.personal.religion || data.personal.caste) && (
                <p>{labels.personal.religion[lang]}: {data.personal.religion}{data.personal.caste ? ` / ${data.personal.caste}` : ''}</p>
              )}
            </div>
          </div>
        </div>

        {['personal', 'family', 'education', 'horoscope', 'expectations', 'contact'].map(renderSection)}
      </div>
    </div>
  )
}
