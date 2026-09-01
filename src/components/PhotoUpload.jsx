import React, { useRef } from 'react'

export default function PhotoUpload({ photo, setPhoto, lang }) {
  const inputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert(lang === 'mr' ? 'कृपया फक्त इमेज फाइल निवडा' : 'Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      setPhoto(ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    setPhoto(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        {photo ? (
          <div className="relative group">
            <img
              src={photo}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-xl border-2 border-primary-200 shadow-sm"
            />
            <button
              onClick={removePhoto}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              ×
            </button>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            className="w-28 h-28 rounded-xl border-2 border-dashed border-primary-300 flex flex-col items-center justify-center cursor-pointer hover:bg-primary-50 transition text-primary-400"
          >
            <span className="text-2xl">📷</span>
            <span className="text-xs mt-1">{lang === 'mr' ? 'फोटो' : 'Photo'}</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition font-medium"
        >
          {photo
            ? (lang === 'mr' ? 'फोटो बदला' : 'Change Photo')
            : (lang === 'mr' ? 'फोटो अपलोड करा' : 'Upload Photo')}
        </button>
        <p className="text-xs text-gray-500 mt-2">
          {lang === 'mr'
            ? 'शिफारस: 1:1 रेशो, स्पष्ट चेहरा'
            : 'Recommended: 1:1 ratio, clear face'}
        </p>
      </div>
    </div>
  )
}
