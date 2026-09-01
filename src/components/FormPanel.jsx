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

export default function FormPanel({
  lang,
  data,
  photo,
  setPhoto,
  photoSize,
  setPhotoSize,
  updateField,
  updateSectionTitle,
  addSibling,
  updateSibling,
  removeSibling,
  addCustomField,
  updateCustomField,
  removeCustomField,
}) {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-5">
        <h2 className="text-lg font-semibold text-primary-800 mb-3 font-devanagari">
          {lang === 'mr' ? 'फोटो (पर्यायी)' : 'Photo (Optional)'}
        </h2>
        <PhotoUpload
          photo={photo}
          setPhoto={setPhoto}
          lang={lang}
          photoSize={photoSize}
          setPhotoSize={setPhotoSize}
        />
      </div>

      {sections.map(({ key, icon }) => {
        const customList = data.customFields?.[key] || []

        return (
          <div key={key} className="bg-white rounded-2xl shadow-sm border border-purple-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{icon}</span>
              <input
                type="text"
                value={data.sectionTitles[key][lang]}
                onChange={(e) =>
                  updateSectionTitle(key, {
                    ...data.sectionTitles[key],
                    [lang]: e.target.value,
                  })
                }
                className="text-lg font-semibold text-primary-800 bg-transparent border-b border-transparent hover:border-primary-200 focus:border-primary-400 outline-none w-full font-devanagari"
              />
            </div>

            <div className="space-y-4">
              {Object.keys(data[key] || {}).map((field) => {
                const isTextarea = ['about', 'kundaliNotes', 'otherExpectations', 'address'].includes(
                  field
                )
                const label = labels[key]?.[field]?.[lang] || field

                return (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-devanagari">
                      {label}
                    </label>
                    {isTextarea ? (
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

              {customList.map((cf, index) => (
                <div
                  key={cf.id}
                  className="p-3 bg-violet-50/60 rounded-xl border border-violet-100 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-violet-700 font-devanagari">
                      {lang === 'mr' ? `अतिरिक्त फील्ड ${index + 1}` : `Extra field ${index + 1}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCustomField(key, cf.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      {lang === 'mr' ? 'हटवा' : 'Remove'}
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 font-devanagari">
                      {lang === 'mr' ? 'फील्ड नाव (बायोडाटा वर दिसेल)' : 'Field name (shown on biodata)'}
                    </label>
                    <input
                      type="text"
                      value={cf.label}
                      onChange={(e) => updateCustomField(key, cf.id, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none text-sm font-devanagari"
                      placeholder={lang === 'mr' ? 'उदा. हॉबी / मोटरसायकल' : 'e.g. Hobby / Vehicle'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 font-devanagari">
                      {lang === 'mr' ? 'मूल्य' : 'Value'}
                    </label>
                    <input
                      type="text"
                      value={cf.value}
                      onChange={(e) => updateCustomField(key, cf.id, 'value', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none text-sm font-devanagari"
                      placeholder={lang === 'mr' ? 'मूल्य लिहा' : 'Enter value'}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addCustomField(key)}
                className="w-full py-2 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 border border-dashed border-primary-200 rounded-lg transition font-devanagari"
              >
                {lang === 'mr' ? '+ नवीन फील्ड जोडा' : '+ Add new field'}
              </button>
            </div>

            {key === 'family' && (
              <div className="mt-6 pt-4 border-t border-purple-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-primary-800 font-devanagari">
                    {lang === 'mr' ? 'भाऊ-बहीण' : 'Siblings'}
                  </h3>
                  <button
                    type="button"
                    onClick={addSibling}
                    className="px-3 py-1.5 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition font-medium"
                  >
                    {lang === 'mr' ? '+ जोडा' : '+ Add'}
                  </button>
                </div>

                {(data.siblings || []).length === 0 && (
                  <p className="text-sm text-gray-500 font-devanagari">
                    {lang === 'mr' ? 'कोणतेही भाऊ-बहीण जोडलेले नाहीत' : 'No siblings added yet'}
                  </p>
                )}

                <div className="space-y-4">
                  {(data.siblings || []).map((sib, index) => (
                    <div
                      key={index}
                      className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary-700">
                          {lang === 'mr' ? `भाऊ/बहीण ${index + 1}` : `Sibling ${index + 1}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeSibling(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          {lang === 'mr' ? 'हटवा' : 'Remove'}
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1 font-devanagari">
                            {labels.sibling.name[lang]}
                          </label>
                          <input
                            type="text"
                            value={sib.name}
                            onChange={(e) => updateSibling(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none text-sm font-devanagari"
                            placeholder={labels.sibling.name[lang]}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1 font-devanagari">
                            {labels.sibling.relation[lang]}
                          </label>
                          <input
                            type="text"
                            value={sib.relation}
                            onChange={(e) => updateSibling(index, 'relation', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none text-sm font-devanagari"
                            placeholder={
                              lang === 'mr'
                                ? 'उदा. मोठा भाऊ / धाकटी बहीण'
                                : 'e.g. Elder Brother / Younger Sister'
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1 font-devanagari">
                            {labels.sibling.maritalStatus[lang]}
                          </label>
                          <input
                            type="text"
                            value={sib.maritalStatus}
                            onChange={(e) => updateSibling(index, 'maritalStatus', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none text-sm font-devanagari"
                            placeholder={lang === 'mr' ? 'अविवाहित / विवाहित' : 'Unmarried / Married'}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
