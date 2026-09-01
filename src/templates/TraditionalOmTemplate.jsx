import React from 'react'

export default function TraditionalOmTemplate({ lang, data, photo, labels }) {
  const title = lang === 'mr' ? 'विवाहासाठी बायोडाटा' : 'Marriage Biodata'

  const renderSection = (sectionKey) => {
    const sectionData = data[sectionKey]
    const titleObj = data.sectionTitles[sectionKey]
    const fields = Object.entries(sectionData).filter(([, v]) => v && v.trim())
    if (fields.length === 0) return null

    return (
      <div key={sectionKey} className="mb-4">
        <h3 className="text-base font-bold text-red-900 border-b border-amber-600 pb-1 mb-2 font-devanagari flex items-center gap-2">
          <span className="text-amber-600">✦</span> {titleObj[lang]}
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          {fields.map(([field, value]) => (
            <div key={field} className={['about', 'siblings', 'kundaliNotes', 'otherExpectations', 'address'].includes(field) ? 'col-span-2' : ''}>
              <span className="font-semibold text-red-900 font-devanagari">
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

          <div className="flex gap-5 mb-5 items-start">
            {photo && (
              <img src={photo} alt="Profile" className="w-32 h-40 object-cover border-2 border-red-800 shadow flex-shrink-0" />
            )}
            <div className="flex-1">
              {data.personal.fullName && (
                <h2 className="text-xl font-bold text-red-950 mb-2">{data.personal.fullName}</h2>
              )}
              <div className="text-sm space-y-1">
                {data.personal.dob && <p><b>{labels.personal.dob[lang]}:</b> {data.personal.dob}</p>}
                {data.personal.height && <p><b>{labels.personal.height[lang]}:</b> {data.personal.height}</p>}
                {data.horoscope.gotra && <p><b>{labels.horoscope.gotra[lang]}:</b> {data.horoscope.gotra}</p>}
                {data.horoscope.rashi && <p><b>{labels.horoscope.rashi[lang]}:</b> {data.horoscope.rashi}</p>}
              </div>
            </div>
          </div>

          {['personal', 'family', 'education', 'horoscope', 'expectations', 'contact'].map(renderSection)}
        </div>
      </div>
    </div>
  )
}
