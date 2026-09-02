import React from 'react'

export const FONT_LEVEL_TO_SCALE = {
  '-8': 0.48,
  '-7': 0.54,
  '-6': 0.60,
  '-5': 0.66,
  '-4': 0.72,
  '-3': 0.78,
  '-2': 0.84,
  '-1': 0.90,
  '0': 1.0,
  '1': 1.08,
  '2': 1.16,
  '3': 1.24,
  '4': 1.32,
}

export function levelToScale(level) {
  const key = String(level)
  return FONT_LEVEL_TO_SCALE[key] ?? 1.0
}

export default function Header({
  lang,
  setLang,
  fontLevel,
  setFontLevel,
  onOpenPreview,
  onOpenTemplates,
  onGeneratePDF,
  onReset,
}) {
  const levels = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4]

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
            <label className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs sm:text-sm">
              <span className="text-gray-500 font-devanagari whitespace-nowrap">
                {lang === 'mr' ? 'फॉन्ट' : 'Font'}
              </span>
              <select
                value={fontLevel}
                onChange={(e) => setFontLevel(Number(e.target.value))}
                className="border-0 bg-transparent font-semibold text-primary-700 outline-none cursor-pointer pr-1"
              >
                {levels.map((lv) => (
                  <option key={lv} value={lv}>
                    {lv > 0 ? `+${lv}` : String(lv)}
                    {lv === 0 ? (lang === 'mr' ? ' (डिफॉल्ट)' : ' (default)') : ''}
                  </option>
                ))}
              </select>
            </label>

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
