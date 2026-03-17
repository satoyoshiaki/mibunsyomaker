"use client";

import { useRef } from "react";
import { CardData } from "@/types/card";
import { CardTemplate } from "@/components/card-templates";
import { ExportButton } from "@/components/ExportButton";

interface CardPreviewProps {
  data: CardData;
  croppedImageSrc?: string | null;
}

export function CardPreview({ data, croppedImageSrc }: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex justify-center min-w-max">
          <div ref={cardRef}>
            <CardTemplate data={data} croppedImageSrc={croppedImageSrc} />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-sm">
        ※ カードは創作用フィクションカードです。本物の身分証明書ではありません。
      </p>

      <ExportButton cardRef={cardRef} fileName={`fiction-card-${data.cardId || "export"}`} />
    </div>
  );
}
