'use client';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ImageUploadCardProps {
  employee?: {
    firstName: string;
    lastName: string;
  };
  form?: {
    watch: (field: string) => string;
  };
}

export default function ImageUploadCard({ employee, form }: ImageUploadCardProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    employee?.firstName ? `/avatars/${employee.firstName}-${employee.lastName}.jpg` : null
  );

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      alert('Please upload an image file (JPG, PNG, GIF)');
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedAvatar(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="px-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Upload card */}
          <div className="flex flex-col items-center justify-center space-y-4 p-6 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="relative rounded-full ">
              <Avatar className="h-32 w-32 border-gray-100">
                <AvatarImage src={selectedAvatar || ''} alt="Profile avatar" />
                <AvatarFallback className="text-2xl font-medium">
                  {form?.watch('firstName')?.[0]}{form?.watch('lastName')?.[0]}
                </AvatarFallback>
              </Avatar>
              {selectedAvatar && (
                <button
                  onClick={() => setSelectedAvatar(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  aria-label="Remove avatar"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="text-center">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  <Upload className="h-5 w-5" />
                  <span className="font-medium">Upload Photo</span>
                </div>
              </Label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <p className="text-sm text-muted-foreground mt-3">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

         
        </div>
      </CardContent>
    </Card>
  );
}