"use client";
import React from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, X, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ImageUploadPreviewProps {
  previewImages: string[];
  onUpload: (files: File[]) => void;
  onRemove: (index: number) => void;
  maxFiles?: number;
}

const EditImagePreview = ({
  previewImages = [],
  onUpload,
  onRemove,
  maxFiles = 5,
}: ImageUploadPreviewProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onUpload,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles,
    multiple: true,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
      {/* Upload Section */}
      <Card className="h-full bg-gradient-to-r dark:from-zinc-700 dark:to-zinc-800">
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
        </CardHeader>
        <CardContent className=" ">
          <div
            {...getRootProps()}
            className={`h-full min-h-[150px] rounded-lg bg-gray-100 flex flex-col items-center justify-center gap-4  transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="bg-gray-100 rounded-full cursor p-4">
              <Upload className="w-6 h-6 text-gray-500" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm text-gray-600">
                {isDragActive
                  ? "Drop the files here"
                  : "Drag & drop images here, or click to select"}
              </p>
              <p className="text-xs text-gray-500">
                Supports: JPEG, PNG, WEBP (Max {maxFiles} files)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card className="h-full  bg-gradient-to-r dark:from-zinc-800 dark:to-zinc-800">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-1">
          {previewImages.length === 0 ? (
            <div className="h-full min-h-[150px] flex items-center justify-center rounded-lg ">
              <p className="text-sm text-gray-500">No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-1">
              {previewImages.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square shadow-sm  rounded-2xl  overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover p-1"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(index);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditImagePreview;