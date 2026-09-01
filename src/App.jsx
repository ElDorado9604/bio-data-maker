import React, { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import FormPanel from './components/FormPanel'
import PreviewPanel from './components/PreviewPanel'
import PreviewModal from './components/PreviewModal'
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
  const [fontScale, setFontScale] = useState(1.05)
  const previewRef = useRef(null)
  const modalCaptureRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('biodata-draft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const loaded = parsed.data || defaultData
        if (typeof loaded.siblings === 'string') loaded.siblings = []
        if (!Array.isArray(loaded.siblings)) loaded.siblings = []
        if (loaded.family && 'siblings' in loaded.family) delete loaded.family.siblings
        setData(loaded)
        setSelectedTemplate(parsed.template || 'classic')
        if (parsed.photo) setPhoto(parsed.photo)
        if (parsed.fontScale) setFontScale(parsed.fontScale)
      } catch (e) {
        console.warn('Could not load draft')
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(
        'biodata-draft',
        JSON.stringify({ data, template: selectedTemplate, photo, fontScale })
      )
    }, 800)
    return () => clearTimeout(timer)
  }, [data, selectedTemplate, photo, fontScale])

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

  const handleGeneratePDF = async () => {
    const el = modalCaptureRef.current || previewRef.current
    if (!el) {
      setShowPreviewModal(true)
      setTimeout(async () => {
        if (modalCaptureRef.current) {
          await generatePDF(modalCaptureRef.current, selectedTemplate, lang)
        }
      }, 300)
      return
    }
    await generatePDF(el, selectedTemplate, lang)
  }

  const handleReset = () => {
    if (window.confirm(lang === 'mr' ? 'सर्व माहिती रीसेट करायची आहे का?' : 'Reset all data?')) {
      setData(defaultData)
      setPhoto(null)
      setFontScale(1.05)
      localStorage.removeItem('biodata-draft')
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        lang={lang}
        setLang={setLang}
        fontScale={fontScale}
        setFontScale={setFontScale}
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
            />
          </div>

          <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
            <PreviewPanel
              ref={previewRef}
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
          captureRef={modalCaptureRef}
          onClose={() => setShowPreviewModal(false)}
          onDownloadPDF={async () => {
            if (modalCaptureRef.current) {
              await generatePDF(modalCaptureRef.current, selectedTemplate, lang)
            }
          }}
        />
      )}

      <footer className="text-center py-6 text-sm text-gray-500 no-print pb-24 lg:pb-6">
        <p>Made with ❤️ for Marathi families • 100% Private</p>
      </footer>
    </div>
  )
}

export default App
