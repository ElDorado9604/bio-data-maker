import React, { forwardRef } from 'react'
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

const PreviewPanel = forwardRef(function PreviewPanel({ lang, data, photo, template }, ref) {
  const TemplateComponent = templateMap[template] || ClassicTemplate

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
      <div className="bg-primary-50 px-4 py-2 border-b border-purple-100 flex items-center justify-between no-print">
        <span className="text-sm font-medium text-primary-800">
          {lang === 'mr' ? 'लाइव्ह प्रीव्ह्यू' : 'Live Preview'}
        </span>
        <span className="text-xs text-primary-600 capitalize">{template} template</span>
      </div>

      <div className="p-4 bg-gray-100 overflow-auto max-h-[80vh]">
        <div
          ref={ref}
          className="mx-auto bg-white shadow-md"
          style={{
            width: '210mm',
            minHeight: '297mm',
            transform: 'scale(0.55)',
            transformOrigin: 'top center',
            marginBottom: '-40%',
          }}
        >
          <TemplateComponent lang={lang} data={data} photo={photo} labels={labels} />
        </div>
      </div>
    </div>
  )
})

export default PreviewPanel
