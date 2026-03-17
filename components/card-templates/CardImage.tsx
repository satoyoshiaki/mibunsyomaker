import { ImageShape } from "@/types/card";
import { User } from "lucide-react";

interface CardImageProps {
  imageSrc: string | null;
  shape: ImageShape;
  size?: number;
  className?: string;
}

const shapeClasses: Record<ImageShape, string> = {
  circle: "rounded-full",
  rounded: "rounded-xl",
  square: "rounded-none",
};

export function CardImage({ imageSrc, shape, size = 80, className = "" }: CardImageProps) {
  const shapeClass = shapeClasses[shape];

  if (!imageSrc) {
    return (
      <div
        aria-label="キャラクター画像（未設定）"
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${shapeClass} ${className}`}
        style={{ width: size, height: size }}
      >
        <User className="text-gray-400" style={{ width: size * 0.5, height: size * 0.5 }} aria-hidden="true" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt="キャラクター画像"
      className={`object-cover ${shapeClass} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
