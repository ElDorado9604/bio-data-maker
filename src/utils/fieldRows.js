/**
 * Build label/value rows for a section: standard fields + custom fields.
 */
export function getSectionRows(data, labels, sectionKey, lang) {
  const sectionData = data[sectionKey]
  const standard = sectionData
    ? Object.entries(sectionData)
        .filter(([, v]) => v && String(v).trim())
        .map(([field, value]) => ({
          label: labels[sectionKey]?.[field]?.[lang] || field,
          value,
        }))
    : []

  const custom = (data.customFields?.[sectionKey] || [])
    .filter((f) => (f.label && f.label.trim()) || (f.value && String(f.value).trim()))
    .map((f) => ({
      label: (f.label && f.label.trim()) || (lang === 'mr' ? 'अतिरिक्त' : 'Extra'),
      value: f.value || '—',
    }))

  return [...standard, ...custom]
}
