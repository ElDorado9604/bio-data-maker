import React, { useRef, useState } from 'react'
import PhotoCropModal from './PhotoCropModal'

export default function PhotoUpload({ photo, setPhoto, lang, photoSize, setPhotoSize }) {
  const inputRef = useRef(null)
  const [rawImage, setRawImage] = useState(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert(lang === 'mr' ? 'कृपया फक्त इमेज फाइल निवडा' : 'Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      setRawImage(ev.target.result)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const removePhoto = () => {
    setPhoto(null)
    setRawImage(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const sizes = [
    { id: 'sm', label: lang === 'mr' ? 'लहान' : 'S' },
    { id: 'md', label: lang === 'mr' ? 'मध्यम' : 'M' },
    { id: 'lg', label: lang === 'mr' ? 'मोठा' : 'L' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          {photo ? (
            <div className="relative group">
              <img
                src={photo}
                alt="Profile"
                className="w-28 h-36 object-cover rounded-xl border-2 border-primary-200 shadow-sm"
              />
              <button
                type="button"
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-90 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current?.click()}
              className="w-28 h-36 rounded-xl border-2 border-dashed border-primary-300 flex flex-col items-center justify-center cursor-pointer hover:bg-primary-50 transition text-primary-400"
            >
              <span className="text-2xl">📷</span>
              <span className="text-xs mt-1">{lang === 'mr' ? 'फोटो' : 'Photo'}</span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition font-medium"
          >
            {photo
              ? lang === 'mr'
                ? 'फोटो बदला'
                : 'Change Photo'
              : lang === 'mr'
                ? 'फोटो अपलोड करा'
                : 'Upload Photo'}
          </button>
          {photo && (
            <button
              type="button"
              onClick={() => setRawImage(photo)}
              className="ml-2 px-4 py-2 text-sm bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 transition font-medium"
            >
              {lang === 'mr' ? 'पुन्हा क्रॉप' : 'Re-crop'}
            </button>
          )}
          <p className="text-xs text-gray-500 font-devanagari">
            {lang === 'mr'
              ? 'अपलोड नंतर ड्रॅग/झूम करून चेहरा फ्रेममध्ये ठेवा'
              : 'After upload, drag & zoom to place the face in frame'}
          </p>
        </div>
      </div>

      {photo && setPhotoSize && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 font-devanagari">
            {lang === 'mr' ? 'फोटो आकार' : 'Photo size'}
          </label>
          <div className="flex gap-2">
            {sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setPhotoSize(s.id)}
                className={`px-4 py-1.5 text-sm rounded-lg border transition font-medium ${
                  photoSize === s.id
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {rawImage && (
        <PhotoCropModal
          imageSrc={rawImage}
          lang={lang}
          onCancel={() => setRawImage(null)}
          onDone={(cropped) => {
            setPhoto(cropped)
            setRawImage(null)
          }}
        />
      )}
    </div>
  )
}
