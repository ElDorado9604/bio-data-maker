import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const outW = 448
  const outH = 576
  canvas.width = outW
  canvas.height = outH

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outW,
    outH
  )

  return canvas.toDataURL('image/jpeg', 0.92)
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = url
  })
}

export default function PhotoCropModal({ imageSrc, lang, onCancel, onDone }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [busy, setBusy] = useState(false)

  const onCropComplete = useCallback((_area, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const handleSave = async () => {
    if (!croppedAreaPixels) return
    setBusy(true)
    try {
      const dataUrl = await getCroppedImg(imageSrc, croppedAreaPixels)
      if (dataUrl) onDone(dataUrl)
      else alert(lang === 'mr' ? 'क्रॉप अयशस्वी' : 'Crop failed')
    } catch (e) {
      console.error(e)
      alert(lang === 'mr' ? 'क्रॉप अयशस्वी' : 'Crop failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-black/80">
      <div className="flex-shrink-0 bg-white px-4 py-3 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-gray-800 font-devanagari">
          {lang === 'mr' ? 'फोटो क्रॉप / फोकस' : 'Crop / Focus photo'}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            {lang === 'mr' ? 'रद्द' : 'Cancel'}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={handleSave}
            className="px-3 py-1.5 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {busy
              ? lang === 'mr'
                ? 'सेव्ह…'
                : 'Saving…'
              : lang === 'mr'
                ? 'सेव्ह'
                : 'Save'}
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-[280px]">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={3 / 4}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          showGrid
        />
      </div>

      <div className="flex-shrink-0 bg-white px-4 py-4 space-y-2">
        <label className="block text-sm text-gray-600 font-devanagari">
          {lang === 'mr' ? 'झूम' : 'Zoom'}
        </label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full accent-primary-600"
        />
        <p className="text-xs text-gray-500 font-devanagari">
          {lang === 'mr'
            ? 'फोटो ड्रॅग करून चेहरा फ्रेममध्ये आणा. झूम वाढवून फोकस करा.'
            : 'Drag the photo to place the face in the frame. Use zoom to focus.'}
        </p>
      </div>
    </div>
  )
}
