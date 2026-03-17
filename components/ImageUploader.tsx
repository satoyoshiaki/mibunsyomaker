"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = { "image/png": [], "image/jpeg": [], "image/webp": [] };

interface ImageUploaderProps {
  imageSrc: string | null;
  onImageChange: (src: string | null) => void;
  onOpenCrop: () => void;
}

export function ImageUploader({ imageSrc, onImageChange, onOpenCrop }: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      setError(null);
      if (rejected.length > 0) {
        const code = rejected[0]?.errors[0]?.code as string | undefined;
        if (code === "file-too-large") {
          setError(`ファイルサイズは${MAX_SIZE_MB}MB以下にしてください`);
        } else if (code === "file-invalid-type") {
          setError("PNG / JPG / WEBP ファイルのみアップロードできます");
        } else {
          setError("ファイルの読み込みに失敗しました");
        }
        return;
      }
      const file = accepted[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          onImageChange(result);
        }
      };
      reader.onerror = () => setError("ファイルの読み込みに失敗しました");
      reader.readAsDataURL(file);
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE_BYTES,
    multiple: false,
  });

  return (
    <div className="space-y-3">
      {imageSrc ? (
        <div className="space-y-2">
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="アップロードされた画像のプレビュー"
              className="h-32 w-32 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
            />
            <button
              type="button"
              aria-label="画像を削除"
              onClick={() => onImageChange(null)}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onOpenCrop}>
            <ImageIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            トリミング調整
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            isDragActive
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
              : "border-gray-300 hover:border-indigo-400 dark:border-gray-600"
          }`}
          role="button"
          aria-label="画像をアップロード"
          tabIndex={0}
        >
          <input {...getInputProps()} aria-label="画像ファイルを選択" />
          <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" aria-hidden="true" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isDragActive ? "ここにドロップ" : "クリックまたはドラッグ&ドロップ"}
          </p>
          <p className="mt-1 text-xs text-gray-400">PNG / JPG / WEBP — 最大{MAX_SIZE_MB}MB</p>
        </div>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
