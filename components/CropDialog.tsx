"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CropArea, ImageShape } from "@/types/card";

interface CropDialogProps {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  initialZoom: number;
  imageShape: ImageShape;
  onApply: (cropArea: CropArea, zoom: number) => void;
}

export function CropDialog({
  open,
  onClose,
  imageSrc,
  initialZoom,
  onApply,
}: CropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(initialZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleApply = () => {
    if (!croppedAreaPixels) return;
    onApply(
      {
        x: croppedAreaPixels.x,
        y: croppedAreaPixels.y,
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height,
      },
      zoom
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>画像のトリミング</DialogTitle>
        </DialogHeader>
        <div
          className="relative h-72 w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800"
          aria-label="クロップエリア"
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="zoom-slider" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            ズーム: {zoom.toFixed(1)}x
          </label>
          <input
            id="zoom-slider"
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-indigo-600"
            aria-label="ズームレベル"
          />
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleApply}>適用</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
