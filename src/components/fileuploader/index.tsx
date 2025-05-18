"use client"
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function FileUploadDemo({
  onUploadComplete,
}: {
  onUploadComplete: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (ff: File | null) => {
    setFile(ff);
    console.log("File selected:", file);
  };

  const handleUpload = async (ff: File) => {
    
    const formData = new FormData();
    formData.append("file", ff);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        onUploadComplete(data.secure_url);
      } else {
        console.error("Upload failed", data);
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileChange} onUpload={handleUpload} />
    </div>
  );
}
