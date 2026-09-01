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

    const imgWidth = canvas.width
    const imgHeight = canvas.height

    const ratio = pdfWidth / imgWidth
    const width = pdfWidth
    const height = imgHeight * ratio

    if (height <= pdfHeight) {
      const y = Math.max(0, (pdfHeight - height) / 2)
      pdf.addImage(imgData, 'JPEG', 0, y, width, height)
    } else {
      let remaining = height
      let position = 0
      let page = 0
      while (remaining > 0) {
        if (page > 0) pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, -position, width, height)
        position += pdfHeight
        remaining -= pdfHeight
        page++
        if (page > 5) break
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
