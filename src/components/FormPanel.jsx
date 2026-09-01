import React from 'react'
import { labels } from '../data/defaultData'
import PhotoUpload from './PhotoUpload'

const sections = [
  { key: 'personal', icon: '👤' },
  { key: 'family', icon: '👨‍👩‍👧‍👦' },
  { key: 'education', icon: '🎓' },
  { key: 'horoscope', icon: '🕉️' },
  { key: 'expectations', icon: '💍' },
  { key: 'contact', icon: '📞' },
]

export default function FormPanel({ lang, data, photo, setPhoto, updateField, updateSectionTitle }) {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-5">
        <h2 className="text-lg font-semibold text-primary-800 mb-3 font-devanagari">
          {lang === 'mr' ? 'फोटो' : 'Photo'}
        </h2>
        <PhotoUpload photo={photo} setPhoto={setPhoto} lang={lang} />
      </div>

      {sections.map(({ key, icon }) => (
        <div key={key} className="bg-white rounded-2xl shadow-sm border border-purple-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{icon}</span>
            <input
              type="text"
              value={data.sectionTitles[key][lang]}
              onChange={(e) => updateSectionTitle(key, { ...data.sectionTitles[key], [lang]: e.target.value })}
              className="text-lg font-semibold text-primary-800 bg-transparent border-b border-transparent hover:border-primary-200 focus:border-primary-400 outline-none w-full font-devanagari"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(data[key]).map((field) => {
              const isFullWidth = ['about', 'siblings', 'kundaliNotes', 'otherExpectations', 'address'].includes(field)
              const label = labels[key][field]?.[lang] || field

              return (
                <div key={field} className={isFullWidth ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-devanagari">
                    {label}
                  </label>
                  {isFullWidth ? (
                    <textarea
                      rows={3}
                      value={data[key][field]}
                      onChange={(e) => updateField(key, field, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none transition resize-y font-devanagari"
                      placeholder={label}
                    />
                  ) : (
                    <input
                      type="text"
                      value={data[key][field]}
                      onChange={(e) => updateField(key, field, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none transition font-devanagari"
                      placeholder={label}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
