"use client";

import { useState, RefObject } from "react";
import { toPng } from "html-to-image";
import { Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportButtonProps {
  cardRef: RefObject<HTMLDivElement | null>;
  fileName: string;
}

export function ExportButton({ cardRef, fileName }: ExportButtonProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmExport = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    setError(null);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
      setShowWarning(false);
    } catch {
      setError("エクスポートに失敗しました。もう一度お試しください。");
    } finally {
      setIsExporting(false);
    }
  };

  if (showWarning) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-warning-title"
        className="w-full max-w-sm rounded-lg border border-amber-300 bg-amber-50 p-4 space-y-3 dark:border-amber-700 dark:bg-amber-950"
      >
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p id="export-warning-title" className="text-sm font-bold text-amber-800 dark:text-amber-300">
              ダウンロード前の注意
            </p>
            <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-0.5 list-disc list-inside">
              <li>このカードは<strong>フィクション（創作）</strong>用です</li>
              <li>実在する身分証明書<strong>ではありません</strong></li>
              <li>公式書類として使用・提示しないでください</li>
              <li>透かし・警告表示は除去しないでください</li>
            </ul>
          </div>
        </div>
        {error && (
          <p role="alert" className="text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={() => setShowWarning(false)}>
            キャンセル
          </Button>
          <Button size="sm" onClick={handleConfirmExport} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" aria-hidden="true" />
            {isExporting ? "出力中..." : "同意してダウンロード"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button onClick={() => setShowWarning(true)} size="lg" className="gap-2">
      <Download className="h-5 w-5" aria-hidden="true" />
      PNG でダウンロード
    </Button>
  );
}
