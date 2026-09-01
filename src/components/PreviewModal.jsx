import React, { useEffect } from 'react'
import { labels } from '../data/defaultData'
import ClassicTemplate from '../templates/ClassicTemplate'
import ModernTemplate from '../templates/ModernTemplate'
import TraditionalOmTemplate from '../templates/TraditionalOmTemplate'
import RoyalGoldTemplate from '../templates/RoyalGoldTemplate'
import MinimalHinduTemplate from '../templates/MinimalHinduTemplate'
import FloralTemplate from '../templates/FloralTemplate'

const templateMap = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  traditional: TraditionalOmTemplate,
  royal: RoyalGoldTemplate,
  minimal: MinimalHinduTemplate,
  floral: FloralTemplate,
}

export default function PreviewModal({
  lang,
  data,
  photo,
  photoSize = 'md',
  template,
  fontScale = 1,
  onClose,
  onDownloadPDF,
}) {
  const TemplateComponent = templateMap[template] || ClassicTemplate

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm">
      <div className="flex-shrink-0 bg-white border-b px-4 py-3 flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 font-devanagari">
          {lang === 'mr' ? 'बायोडाटा प्रीव्ह्यू' : 'Biodata Preview'}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onDownloadPDF}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition shadow-sm"
          >
            {lang === 'mr' ? 'PDF डाउनलोड' : 'Download PDF'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            {lang === 'mr' ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-6 bg-gray-200">
        <div className="mx-auto flex justify-center">
          <div
            className="bg-white shadow-xl overflow-hidden"
            style={{
              width: '210mm',
              maxWidth: '100%',
              minHeight: '297mm',
              fontSize: `${16 * fontScale}px`,
            }}
          >
            <TemplateComponent
              lang={lang}
              data={data}
              photo={photo}
              photoSize={photoSize}
              labels={labels}
              fontScale={fontScale}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
