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

const PdfCapture = forwardRef(function PdfCapture(
  { lang, data, template, fontScale = 1 },
  ref
) {
  const TemplateComponent = templateMap[template] || ClassicTemplate

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: '-10000px',
        top: 0,
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 1,
      }}
    >
      <div
        ref={ref}
        style={{
          width: '210mm',
          minHeight: '297mm',
          background: '#ffffff',
          fontSize: `${16 * fontScale}px`,
        }}
      >
        <TemplateComponent
          lang={lang}
          data={data}
          labels={labels}
          fontScale={fontScale}
        />
      </div>
    </div>
  )
})

export default PdfCapture
