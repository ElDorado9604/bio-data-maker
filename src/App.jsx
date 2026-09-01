import React, { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import FormPanel from './components/FormPanel'
import PreviewPanel from './components/PreviewPanel'
import TemplateSelector from './components/TemplateSelector'
import { defaultData } from './data/defaultData'
import { generatePDF } from './utils/pdfGenerator'

function App() {
  const [lang, setLang] = useState('mr')
  const [data, setData] = useState(defaultData)
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [photo, setPhoto] = useState(null)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const previewRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('biodata-draft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const loaded = parsed.data || defaultData
        if (typeof loaded.siblings === 'string') {
          loaded.siblings = []
        }
        if (!Array.isArray(loaded.siblings)) {
          loaded.siblings = []
        }
        if (loaded.family && 'siblings' in loaded.family) {
          delete loaded.family.siblings
        }
        setData(loaded)
        setSelectedTemplate(parsed.template || 'classic')
        if (parsed.photo) setPhoto(parsed.photo)
      } catch (e) {
        console.warn('Could not load draft')
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('biodata-draft', JSON.stringify({
        data,
        template: selectedTemplate,
        photo
      }))
    }, 800)
    return () => clearTimeout(timer)
  }, [data, selectedTemplate, photo])

  const updateField = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const updateSectionTitle = (section, title) => {
    setData(prev => ({
      ...prev,
      sectionTitles: {
        ...prev.sectionTitles,
        [section]: title
      }
    }))
  }

  const addSibling = () => {
    setData(prev => ({
      ...prev,
      siblings: [...prev.siblings, { name: '', relation: '', maritalStatus: '' }]
    }))
  }

  const updateSibling = (index, field, value) => {
    setData(prev => {
      const siblings = [...prev.siblings]
      siblings[index] = { ...siblings[index], [field]: value }
      return { ...prev, siblings }
    })
  }

  const removeSibling = (index) => {
    setData(prev => ({
      ...prev,
      siblings: prev.siblings.filter((_, i) => i !== index)
    }))
  }

  const handleGeneratePDF = async () => {
    if (!previewRef.current) return
    await generatePDF(previewRef.current, selectedTemplate, lang)
  }

  const handleReset = () => {
    if (window.confirm(lang === 'mr' ? 'सर्व माहिती रीसेट करायची आहे का?' : 'Reset all data?')) {
      setData(defaultData)
      setPhoto(null)
      localStorage.removeItem('biodata-draft')
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        lang={lang}
        setLang={setLang}
        onGeneratePDF={handleGeneratePDF}
        onOpenTemplates={() => setShowTemplateModal(true)}
        onReset={handleReset}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          <div className="lg:sticky lg:top-24 h-fit">
            <PreviewPanel
              ref={previewRef}
              lang={lang}
              data={data}
              photo={photo}
              template={selectedTemplate}
            />
          </div>
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

      <footer className="text-center py-6 text-sm text-gray-500 no-print">
        <p>Made with ❤️ for Marathi families • 100% Private • Data stays in your browser</p>
      </footer>
    </div>
  )
}

export default App
