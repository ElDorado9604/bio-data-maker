import React from 'react'

export default function FloralTemplate({ lang, data, photo, labels }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'

  const renderSection = (sectionKey) => {
    const sectionData = data[sectionKey]
    const titleObj = data.sectionTitles[sectionKey]
    const fields = Object.entries(sectionData).filter(([, v]) => v && v.trim())
    if (fields.length === 0) return null

    return (
      <div key={sectionKey} className="mb-4">
        <h3 className="text-base font-bold text-fuchsia-800 border-b border-fuchsia-300 pb-1 mb-2 font-devanagari">
          ✿ {titleObj[lang]}
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          {fields.map(([field, value]) => (
            <div key={field} className={['about', 'siblings', 'kundaliNotes', 'otherExpectations', 'address'].includes(field) ? 'col-span-2' : ''}>
              <span className="font-semibold text-fuchsia-900 font-devanagari">
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
    <div className="p-6 font-devanagari text-gray-900 bg-gradient-to-br from-fuchsia-50 to-purple-50" style={{ minHeight: '297mm' }}>
      <div className="border-2 border-fuchsia-400 rounded-lg p-5 h-full relative">
        <div className="absolute -top-3 -left-1 text-fuchsia-500 text-2xl">✿</div>
        <div className="absolute -top-3 -right-1 text-fuchsia-500 text-2xl">✿</div>
        <div className="absolute -bottom-3 -left-1 text-fuchsia-500 text-2xl">✿</div>
        <div className="absolute -bottom-3 -right-1 text-fuchsia-500 text-2xl">✿</div>

        <div className="text-center mb-5">
          <p className="text-fuchsia-800 font-semibold">|| ॐ गणेशाय नमः ||</p>
          <h1 className="text-2xl font-bold text-fuchsia-950 mt-1">{title}</h1>
        </div>

        <div className="flex gap-5 mb-5 items-start">
          {photo && (
            <img src={photo} alt="Profile" className="w-32 h-40 object-cover rounded-lg border-2 border-fuchsia-300 shadow flex-shrink-0" />
          )}
          <div className="flex-1">
            {data.personal.fullName && (
              <h2 className="text-xl font-bold text-fuchsia-950 mb-2">{data.personal.fullName}</h2>
            )}
            <div className="text-sm space-y-1">
              {data.personal.dob && <p><b>{labels.personal.dob[lang]}:</b> {data.personal.dob}</p>}
              {data.personal.height && <p><b>{labels.personal.height[lang]}:</b> {data.personal.height}</p>}
              {data.horoscope.nakshatra && <p><b>{labels.horoscope.nakshatra[lang]}:</b> {data.horoscope.nakshatra}</p>}
            </div>
          </div>
        </div>

        {['personal', 'family', 'education', 'horoscope', 'expectations', 'contact'].map(renderSection)}
      </div>
    </div>
  )
}
