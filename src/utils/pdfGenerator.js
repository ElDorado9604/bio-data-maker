import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function generatePDF(element, template, lang) {
  if (!element) {
    alert(lang === 'mr' ? 'प्रीव्ह्यू सापडले नाही' : 'Preview not found')
    return
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    })

    const imgData = canvas.toDataURL('image/jpeg', 0.95)
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const width = imgWidth * ratio
    const height = imgHeight * ratio

    const x = (pdfWidth - width) / 2
    const y = 0

    pdf.addImage(imgData, 'JPEG', x, y, width, height)

    const fileName = lang === 'mr' 
      ? `विवाह_बायोडाटा_${new Date().toISOString().slice(0,10)}.pdf`
      : `Marriage_Biodata_${new Date().toISOString().slice(0,10)}.pdf`

    pdf.save(fileName)
  } catch (err) {
    console.error(err)
    alert(lang === 'mr' ? 'PDF तयार करताना त्रुटी आली' : 'Error generating PDF')
  }
}
