import React from 'react'

export default function Header({
  lang,
  setLang,
  fontScale,
  setFontScale,
  onOpenPreview,
  onOpenTemplates,
  onGeneratePDF,
  onReset,
}) {
  const fontOptions = [
    { value: 0.95, label: lang === 'mr' ? 'लहान' : 'S' },
    { value: 1.05, label: lang === 'mr' ? 'मध्यम' : 'M' },
    { value: 1.2, label: lang === 'mr' ? 'मोठे' : 'L' },
  ]

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40 no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-primary-700 font-semibold text-xs sm:text-sm truncate">
                || ॐ गणेशाय नमः ||
              </p>
              <h1 className="text-base sm:text-xl font-bold text-gray-800 font-devanagari truncate">
                {lang === 'mr' ? 'विवाह बायोडाटा क्रिएटर' : 'Marriage Biodata Creator'}
              </h1>
            </div>

            <div className="flex rounded-lg overflow-hidden border border-primary-200 flex-shrink-0">
              <button
                onClick={() => setLang('mr')}
                className={`px-2.5 py-1 text-xs sm:text-sm font-medium transition ${
                  lang === 'mr' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs sm:text-sm font-medium transition ${
                  lang === 'en' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-1.5 py-0.5">
              <span className="text-[10px] sm:text-xs text-gray-500 px-1 font-devanagari">
                {lang === 'mr' ? 'फॉन्ट' : 'Font'}
              </span>
              {fontOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFontScale(opt.value)}
                  className={`min-w-[28px] px-1.5 py-1 text-xs font-semibold rounded transition ${
                    Math.abs(fontScale - opt.value) < 0.01
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:bg-primary-50'
                  }`}
                  title={opt.label}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenTemplates}
              className="px-2.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-white border border-primary-200 text-primary-700 hover:bg-primary-50 transition"
            >
              {lang === 'mr' ? 'टेम्पलेट्स' : 'Templates'}
            </button>

            <button
              onClick={onOpenPreview}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition shadow-sm"
            >
              {lang === 'mr' ? 'प्रीव्ह्यू' : 'Preview'}
            </button>

            <button
              onClick={onGeneratePDF}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition shadow-sm"
            >
              PDF
            </button>

            <button
              onClick={onReset}
              className="px-2.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition"
            >
              {lang === 'mr' ? 'रीसेट' : 'Reset'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
