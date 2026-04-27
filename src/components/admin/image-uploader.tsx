'use client'

import { useCallback, useState } from 'react'
import { UploadButton } from '@uploadthing/react'
import type { OurFileRouter } from '@/app/api/uploadthing/core'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function ImageUploader({ value, onChange, disabled }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUploadComplete = useCallback((res: { url: string }[]) => {
    if (res.length > 0) {
      onChange(res[0].url)
    }
    setIsUploading(false)
  }, [onChange])

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative group">
          <div className="relative h-40 w-full rounded-lg overflow-hidden border border-stone-300 dark:border-stone-700">
            <img
              src={value}
              alt="Cover preview"
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-stone-500 truncate max-w-[200px]">{value}</span>
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs text-red-600 hover:underline"
            >
              Remover
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-lg p-6 text-center">
          <p className="text-sm text-stone-500 mb-2">Nenhuma imagem selecionada</p>
          <p className="text-xs text-stone-400">Clique no botão abaixo para fazer upload</p>
        </div>
      )}

      <UploadButton<OurFileRouter, 'imageUploader'>
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadBegin={() => setIsUploading(true)}
        onUploadError={(error) => {
          console.error('Upload error:', error)
          setIsUploading(false)
        }}
        disabled={disabled || isUploading}
        className={cn(
          "mt-2 bg-red-700 hover:bg-red-800 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isUploading && "opacity-50"
        )}
      />
    </div>
  )
}