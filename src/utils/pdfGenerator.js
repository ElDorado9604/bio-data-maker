import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function generatePDF(element, template, lang) {
  if (!element) {
    alert(lang === 'mr' ? 'प्रीव्ह्यू सापडले नाही' : 'Preview not found')
    return
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    })

    const imgData = canvas.toDataURL('image/jpeg', 0.95)
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const margin = 4

    const usableW = pdfWidth - margin * 2
    const usableH = pdfHeight - margin * 2

    const imgWidth = canvas.width
    const imgHeight = canvas.height

    let width = usableW
    let height = (imgHeight * usableW) / imgWidth

    // Shrink slightly to fit one page when close — avoids mid-section page cuts
    if (height > usableH && height <= usableH * 1.35) {
      const fit = usableH / height
      width *= fit
      height = usableH
    }

    if (height <= usableH) {
      const x = margin + (usableW - width) / 2
      const y = margin + Math.max(0, (usableH - height) / 2)
      pdf.addImage(imgData, 'JPEG', x, y, width, height)
    } else {
      const pageImgHeight = (usableH / width) * imgWidth
      let srcY = 0
      let page = 0
      while (srcY < imgHeight - 2) {
        if (page > 0) pdf.addPage()
        const drawnH = (imgHeight * width) / imgWidth
        const yOffset = margin - (srcY / imgHeight) * drawnH
        pdf.addImage(imgData, 'JPEG', margin, yOffset, width, drawnH)
        srcY += pageImgHeight
        page++
        if (page > 6) break
      }
    }

    const fileName =
      lang === 'mr'
        ? `विवाह_बायोडाटा_${new Date().toISOString().slice(0, 10)}.pdf`
        : `Marriage_Biodata_${new Date().toISOString().slice(0, 10)}.pdf`

    pdf.save(fileName)
  } catch (err) {
    console.error(err)
    alert(lang === 'mr' ? 'PDF तयार करताना त्रुटी आली' : 'Error generating PDF')
  }
}
