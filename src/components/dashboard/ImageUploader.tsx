// src/components/dashboard/ImageUploader.tsx
"use client";

import { useState, useRef } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    
    // ফাইল সাইজ চেক (Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onChange(data.secure_url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      {value ? (
        <div className="relative group w-full aspect-[3/1] overflow-hidden rounded-xl border bg-muted">
          <img
            src={value}
            alt="Cover"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full bg-white/20 p-3 text-white hover:bg-white/30 backdrop-blur-sm transition"
            >
              <ImagePlus className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full bg-red-500/80 p-3 text-white hover:bg-red-500 backdrop-blur-sm transition"
            >
              <X className="size-6" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={cn(
            "flex w-full aspect-[3/1] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-muted/30 transition-colors hover:bg-muted/50 hover:border-primary/50",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
        >
          {isUploading ? (
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          ) : (
            <>
              <div className="rounded-full bg-background p-3 shadow-sm border">
                <ImagePlus className="size-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Click to upload cover image</p>
                <p className="text-xs text-muted-foreground mt-1">Recommended size: 1200x400</p>
              </div>
            </>
          )}
        </button>
      )}
    </div>
  );
}