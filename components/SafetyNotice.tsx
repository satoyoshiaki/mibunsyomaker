import { AlertTriangle } from "lucide-react";

export function SafetyNotice() {
  return (
    <div
      role="note"
      aria-label="安全上の注意"
      className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300"
    >
      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
      <div className="space-y-1">
        <p className="font-semibold">このアプリについて</p>
        <p>
          これは創作・エンタメ用の<strong>フィクションカードジェネレーター</strong>です。
          生成されたカードは<strong>公式の身分証明書ではありません</strong>。
          実在の国・機関・人物とは一切関係ありません。
          本物の身分証明書として使用・提示・偽造に使用することは絶対にしないでください。
        </p>
        <p className="text-xs opacity-80">
          This is a fictional card generator for creative/entertainment purposes only.
          NOT AN OFFICIAL ID. FOR ENTERTAINMENT ONLY.
        </p>
      </div>
    </div>
  );
}
