import React from 'react'

const templates = [
  {
    id: 'classic',
    name: { mr: 'क्लासिक', en: 'Classic' },
    desc: { mr: 'डबल बॉर्डर, पारंपारिक', en: 'Double border, traditional' },
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 'modern',
    name: { mr: 'मॉडर्न', en: 'Modern' },
    desc: { mr: 'ग्रेडियंट हेडर + अॅक्सेंट', en: 'Gradient header + accent' },
    color: 'from-violet-500 to-purple-700',
  },
  {
    id: 'traditional',
    name: { mr: 'पारंपरिक ॐ', en: 'Traditional Om' },
    desc: { mr: 'मरून + सोनेरी, ॐ चिन्ह', en: 'Maroon + gold with Om' },
    color: 'from-red-800 to-amber-700',
  },
  {
    id: 'royal',
    name: { mr: 'रॉयल गोल्ड', en: 'Royal Gold' },
    desc: { mr: 'क्रीम + जाड सोनेरी बॉर्डर', en: 'Cream + thick gold border' },
    color: 'from-amber-600 to-yellow-700',
  },
  {
    id: 'minimal',
    name: { mr: 'मिनिमल हिंदू', en: 'Minimal Hindu' },
    desc: { mr: 'स्वच्छ + केशरी अॅक्सेंट', en: 'Clean + saffron accent' },
    color: 'from-orange-500 to-rose-600',
  },
  {
    id: 'floral',
    name: { mr: 'फ्लोरल', en: 'Floral' },
    desc: { mr: 'सजावटी फुलांचा बॉर्डर', en: 'Decorative floral border' },
    color: 'from-fuchsia-500 to-purple-600',
  },
]

export default function TemplateSelector({ lang, selected, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800 font-devanagari">
            {lang === 'mr' ? 'टेम्पलेट निवडा' : 'Choose Template'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`text-left rounded-xl border-2 p-4 transition hover:shadow-lg ${
                selected === t.id
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className={`h-24 rounded-lg bg-gradient-to-br ${t.color} mb-3 flex items-center justify-center text-white text-3xl font-bold`}>
                {t.id === 'traditional' ? 'ॐ' : t.id === 'royal' ? '✦' : t.id === 'floral' ? '✿' : '◈'}
              </div>
              <h3 className="font-semibold text-gray-800 font-devanagari">
                {t.name[lang]}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{t.desc[lang]}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
