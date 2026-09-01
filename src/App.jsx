import React, { useState, useRef, useEffect } from 'react'
import Header, { levelToScale } from './components/Header'
import FormPanel from './components/FormPanel'
import PreviewPanel from './components/PreviewPanel'
import PreviewModal from './components/PreviewModal'
import PdfCapture from './components/PdfCapture'
import TemplateSelector from './components/TemplateSelector'
import { defaultData } from './data/defaultData'
import { generatePDF } from './utils/pdfGenerator'

function App() {
  const [lang, setLang] = useState('mr')
  const [data, setData] = useState(defaultData)
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [photo, setPhoto] = useState(null)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [fontLevel, setFontLevel] = useState(0)
  const [pdfBusy, setPdfBusy] = useState(false)
  const pdfRef = useRef(null)

  const fontScale = levelToScale(fontLevel)

  useEffect(() => {
    const saved = localStorage.getItem('biodata-draft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const loaded = parsed.data || defaultData
        if (typeof loaded.siblings === 'string') loaded.siblings = []
        if (!Array.isArray(loaded.siblings)) loaded.siblings = []
        if (loaded.family && 'siblings' in loaded.family) delete loaded.family.siblings
        if (!loaded.customFields || typeof loaded.customFields !== 'object') {
          loaded.customFields = {
            personal: [], family: [], education: [],
            horoscope: [], expectations: [], contact: [],
          }
        }
        setData(loaded)
        setSelectedTemplate(parsed.template || 'classic')
        if (parsed.photo) setPhoto(parsed.photo)
        if (typeof parsed.fontLevel === 'number') {
          setFontLevel(parsed.fontLevel)
        } else if (typeof parsed.fontScale === 'number') {
          if (parsed.fontScale <= 0.95) setFontLevel(-1)
          else if (parsed.fontScale >= 1.15) setFontLevel(2)
          else setFontLevel(0)
        }
      } catch (e) {
        console.warn('Could not load draft')
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(
        'biodata-draft',
        JSON.stringify({ data, template: selectedTemplate, photo, fontLevel })
      )
    }, 800)
    return () => clearTimeout(timer)
  }, [data, selectedTemplate, photo, fontLevel])

  const updateField = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }))
  }

  const updateSectionTitle = (section, title) => {
    setData((prev) => ({
      ...prev,
      sectionTitles: { ...prev.sectionTitles, [section]: title },
    }))
  }

  const addSibling = () => {
    setData((prev) => ({
      ...prev,
      siblings: [...prev.siblings, { name: '', relation: '', maritalStatus: '' }],
    }))
  }

  const updateSibling = (index, field, value) => {
    setData((prev) => {
      const siblings = [...prev.siblings]
      siblings[index] = { ...siblings[index], [field]: value }
      return { ...prev, siblings }
    })
  }

  const removeSibling = (index) => {
    setData((prev) => ({
      ...prev,
      siblings: prev.siblings.filter((_, i) => i !== index),
    }))
  }

  const addCustomField = (section) => {
    setData((prev) => {
      const list = [...(prev.customFields?.[section] || [])]
      list.push({
        id: `cf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        label: '',
        value: '',
      })
      return {
        ...prev,
        customFields: { ...(prev.customFields || {}), [section]: list },
      }
    })
  }

  const updateCustomField = (section, id, field, value) => {
    setData((prev) => {
      const list = (prev.customFields?.[section] || []).map((cf) =>
        cf.id === id ? { ...cf, [field]: value } : cf
      )
      return {
        ...prev,
        customFields: { ...(prev.customFields || {}), [section]: list },
      }
    })
  }

  const removeCustomField = (section, id) => {
    setData((prev) => {
      const list = (prev.customFields?.[section] || []).filter((cf) => cf.id !== id)
      return {
        ...prev,
        customFields: { ...(prev.customFields || {}), [section]: list },
      }
    })
  }

  const handleGeneratePDF = async () => {
    if (pdfBusy) return
    setPdfBusy(true)
    try {
      if (!pdfRef.current) {
        alert(lang === 'mr' ? 'PDF तयार करू शकत नाही' : 'Cannot generate PDF')
        return
      }
      await generatePDF(pdfRef.current, selectedTemplate, lang)
    } finally {
      setPdfBusy(false)
    }
  }

  const handleReset = () => {
    if (window.confirm(lang === 'mr' ? 'सर्व माहिती रीसेट करायची आहे का?' : 'Reset all data?')) {
      setData(defaultData)
      setPhoto(null)
      setFontLevel(0)
      localStorage.removeItem('biodata-draft')
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        lang={lang}
        setLang={setLang}
        fontLevel={fontLevel}
        setFontLevel={setFontLevel}
        onOpenPreview={() => setShowPreviewModal(true)}
        onOpenTemplates={() => setShowTemplateModal(true)}
        onGeneratePDF={handleGeneratePDF}
        onReset={handleReset}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="no-print">
            <FormPanel
              lang={lang}
              data={data}
              photo={photo}
              setPhoto={setPhoto}
              updateField={updateField}
              updateSectionTitle={updateSectionTitle}
              addSibling={addSibling}
              updateSibling={updateSibling}
              removeSibling={removeSibling}
              addCustomField={addCustomField}
              updateCustomField={updateCustomField}
              removeCustomField={removeCustomField}
            />
          </div>

          <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
            <PreviewPanel
              lang={lang}
              data={data}
              photo={photo}
              template={selectedTemplate}
              fontScale={fontScale}
            />
          </div>
        </div>

        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30 no-print">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-semibold text-base shadow-lg hover:bg-violet-700 transition font-devanagari"
          >
            {lang === 'mr' ? 'बायोडाटा प्रीव्ह्यू पहा' : 'Preview Biodata'}
          </button>
        </div>
      </main>

      {showTemplateModal && (
        <TemplateSelector
          lang={lang}
          selected={selectedTemplate}
          onSelect={(t) => {
            setSelectedTemplate(t)
            setShowTemplateModal(false)
          }}
          onClose={() => setShowTemplateModal(false)}
        />
      )}

      {showPreviewModal && (
        <PreviewModal
          lang={lang}
          data={data}
          photo={photo}
          template={selectedTemplate}
          fontScale={fontScale}
          onClose={() => setShowPreviewModal(false)}
          onDownloadPDF={handleGeneratePDF}
        />
      )}

      <PdfCapture
        ref={pdfRef}
        lang={lang}
        data={data}
        photo={photo}
        template={selectedTemplate}
        fontScale={fontScale}
      />

      {pdfBusy && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 no-print">
          <div className="bg-white rounded-xl px-6 py-4 shadow-lg font-devanagari text-gray-800">
            {lang === 'mr' ? 'PDF तयार होत आहे…' : 'Generating PDF…'}
          </div>
        </div>
      )}

      <footer className="text-center py-6 text-sm text-gray-500 no-print pb-24 lg:pb-6">
        <p>Made with ❤️ for Marathi families • 100% Private</p>
      </footer>
    </div>
  )
}

export default App
