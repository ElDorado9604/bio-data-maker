import React from 'react'

export default function Header({ lang, setLang, onGeneratePDF, onOpenTemplates, onReset }) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40 no-print">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="text-primary-700 font-semibold text-sm sm:text-base">
              || ॐ गणेशाय नमः ||
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 font-devanagari">
              {lang === 'mr' ? 'विवाह बायोडाटा क्रिएटर' : 'Marriage Biodata Creator'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex rounded-lg overflow-hidden border border-primary-200">
              <button
                onClick={() => setLang('mr')}
                className={`px-3 py-1.5 text-sm font-medium transition ${
                  lang === 'mr'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-sm font-medium transition ${
                  lang === 'en'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                English
              </button>
            </div>

            <button
              onClick={onOpenTemplates}
              className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white border border-primary-200 text-primary-700 hover:bg-primary-50 transition"
            >
              {lang === 'mr' ? 'टेम्पलेट्स' : 'Templates'}
            </button>

            <button
              onClick={onGeneratePDF}
              className="px-4 py-1.5 text-sm font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition shadow-sm"
            >
              {lang === 'mr' ? 'PDF डाउनलोड' : 'Download PDF'}
            </button>

            <button
              onClick={onReset}
              className="px-3 py-1.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition"
            >
              {lang === 'mr' ? 'रीसेट' : 'Reset'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
