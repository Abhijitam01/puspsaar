'use client'

import React, { useState, useRef } from 'react'
import { Trash2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


interface ImageUploadProps {
  value?: string
  onChange?: (value: string) => void
  onFileChange?: (file: File) => void
  accept?: string
  maxSize?: number // in MB
  className?: string
  disabled?: boolean
}

export function ImageUpload({
  value,
  onChange,
  onFileChange,
  accept = "image/*",
  maxSize = 50,
  className,
  disabled = false
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setError(null)
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      onChange?.(result)
      onFileChange?.(file)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    setPreview(null)
    setError(null)
    onChange?.('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getAcceptedFormats = () => {
    if (accept === "image/*") return "JPEG, PNG, GIF, WebP"
    return accept.split(',').map(type => type.trim().replace('image/', '').toUpperCase()).join(', ')
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-15 ">
        {/* Upload Area */}
        <div
                className={cn(
        "border-1 border-dashed  flex justify-center items-center shadow-lg rounded-lg p-6 text-center transition-all duration-200 cursor-pointer shadow-sm",
        isDragging
          ? "border-primary bg-primary/5 dark:border-primary dark:bg-primary/10"
          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}

          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={!disabled ? handleBrowseClick : undefined}
        >
          <div className="space-y-4 ">
            <Upload className="w-8 h-8 mx-auto text-gray-400 " />
            <div>
              <p className="font-semibold text-gray-700">
                Choose a file or drag & drop it here
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {getAcceptedFormats()} formats, up to {maxSize} MB
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation()
                handleBrowseClick()
              }}
            >
              Browse File
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="border-1 border-dashed border-gray-300 rounded-lg p-6 text-center min-h-[170px] shadow-lg flex items-center justify-center">
          {preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemove}
                disabled={disabled}
              >
                <Trash2 className="w-4 h-4 bg-primary" />
              </Button>
            </div>
          ) : (
            <div className="text-gray-400">
              <p className="font-bold text-gray-700">Preview</p>
              <p className="text-sm text-gray-500 mt-1">Image preview will appear here</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
}