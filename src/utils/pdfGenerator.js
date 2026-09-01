import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function generatePDF(element, template, lang) {
  if (!element) {
    alert(
      lang === 'mr'
        ? 'प्रीव्ह्यू सापडले नाही — कृपया प्रीव्ह्यू उघडा'
        : 'Preview not found — please open Preview first'
    )
    return
  }

  try {
    const A4_WIDTH_PX = 794
    const prevWidth = element.style.width
    const prevMaxWidth = element.style.maxWidth
    const prevTransform = element.style.transform

    element.style.width = A4_WIDTH_PX + 'px'
    element.style.maxWidth = A4_WIDTH_PX + 'px'
    element.style.transform = 'none'

    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: A4_WIDTH_PX,
      windowWidth: A4_WIDTH_PX,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc, clonedEl) => {
        clonedEl.style.width = A4_WIDTH_PX + 'px'
        clonedEl.style.maxWidth = A4_WIDTH_PX + 'px'
        clonedEl.style.transform = 'none'
        clonedEl.style.fontSize = element.style.fontSize || '16px'
        clonedEl.querySelectorAll('[style*="transform"]').forEach((n) => {
          n.style.transform = 'none'
        })
      },
    })

    element.style.width = prevWidth
    element.style.maxWidth = prevMaxWidth
    element.style.transform = prevTransform

    if (!canvas.width || !canvas.height) {
      throw new Error('Empty canvas')
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.95)
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const margin = 3
    const usableW = pdfWidth - margin * 2
    const usableH = pdfHeight - margin * 2

    let width = usableW
    let height = (canvas.height * usableW) / canvas.width

    if (height > usableH && height <= usableH * 1.4) {
      const fit = usableH / height
      width *= fit
      height = usableH
    }

    if (height <= usableH) {
      const x = margin + (usableW - width) / 2
      pdf.addImage(imgData, 'JPEG', x, margin, width, height)
    } else {
      const pageCount = Math.ceil(height / usableH)
      for (let page = 0; page < pageCount; page++) {
        if (page > 0) pdf.addPage()
        const y = margin - page * usableH
        pdf.addImage(imgData, 'JPEG', margin, y, width, height)
      }
    }

    const fileName =
      lang === 'mr'
        ? `विवाह_बायोडाटा_${new Date().toISOString().slice(0, 10)}.pdf`
        : `Marriage_Biodata_${new Date().toISOString().slice(0, 10)}.pdf`

    pdf.save(fileName)
  } catch (err) {
    console.error('PDF error:', err)
    alert(
      lang === 'mr'
        ? 'PDF तयार करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.'
        : 'Error generating PDF. Please try again.'
    )
  }
}
