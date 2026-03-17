"use client";

import { useState } from "react";
import { CardData, SAMPLE_CARD_DATA } from "@/types/card";
import { CardForm } from "@/components/CardForm";
import { CardPreview } from "@/components/CardPreview";
import { SafetyNotice } from "@/components/SafetyNotice";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Layers } from "lucide-react";

export function CardEditor() {
  const [cardData, setCardData] = useState<CardData>(SAMPLE_CARD_DATA);
  const [croppedImageSrc, setCroppedImageSrc] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-indigo-600" aria-hidden="true" />
            <div>
              <h1 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
                Fiction Card Maker
              </h1>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-none">
                フィクションカードジェネレーター
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950 dark:text-red-400">
              NOT AN OFFICIAL ID
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Safety notice */}
        <div className="mb-6">
          <SafetyNotice />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Form */}
          <section
            aria-labelledby="form-section-label"
            className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
          >
            <h2
              id="form-section-label"
              className="mb-5 text-lg font-semibold text-gray-900 dark:text-gray-100"
            >
              カード情報入力
            </h2>
            <CardForm
              data={cardData}
              onChange={setCardData}
              onCroppedImageChange={setCroppedImageSrc}
            />
          </section>

          {/* Right: Preview */}
          <section
            aria-labelledby="preview-section-label"
            className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 lg:sticky lg:top-24 lg:self-start"
          >
            <h2
              id="preview-section-label"
              className="mb-5 text-lg font-semibold text-gray-900 dark:text-gray-100"
            >
              プレビュー
            </h2>
            <CardPreview data={cardData} croppedImageSrc={croppedImageSrc} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 py-6 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Fiction Card Maker — 創作・エンタメ専用。生成物は本物の身分証明書ではありません。
          <br />
          NOT AN OFFICIAL ID · FOR ENTERTAINMENT ONLY · SAMPLE
        </p>
      </footer>
    </div>
  );
}
