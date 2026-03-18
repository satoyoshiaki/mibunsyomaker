import { CardData } from "@/types/card";
import { formatDate } from "@/lib/utils";
import { WatermarkOverlay } from "./WatermarkOverlay";
import { CardImage } from "./CardImage";

interface JpFormalProps {
  data: CardData;
  croppedImageSrc?: string | null;
}

export function JpFormal({ data, croppedImageSrc }: JpFormalProps) {
  const imgSrc = croppedImageSrc ?? data.imageSrc;
  const accent = data.favoriteColor || "#8b1a1a";

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        width: 420,
        height: 260,
        background: "#faf6ee",
        borderRadius: 4,
        boxShadow: "0 2px 16px #00000033",
        fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Times New Roman', serif",
        color: "#1a1208",
        border: `3px double ${accent}`,
      }}
      role="img"
      aria-label="和様証明書 フィクションカード"
    >
      {/* 背景の薄い家紋風装飾 */}
      <div
        className="absolute inset-0 opacity-[0.04] flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        style={{ fontSize: 180 }}
      >
        ✿
      </div>

      {/* 上部ヘッダー */}
      <div
        className="relative px-4 py-2 flex items-center justify-between"
        style={{
          background: `linear-gradient(90deg, ${accent} 0%, ${accent}cc 100%)`,
          borderBottom: `2px solid ${accent}`,
        }}
      >
        {/* 左：架空機関名 */}
        <div className="flex flex-col">
          <span className="text-[8px] font-bold tracking-[0.4em] text-white opacity-90 uppercase">
            FICTION DOCUMENT
          </span>
          <span className="text-[11px] font-bold text-white tracking-widest">
            架空創作機関　証明書
          </span>
        </div>
        {/* 右：架空マーク */}
        <div
          className="flex items-center justify-center rounded-sm text-[8px] font-black tracking-wider px-1.5 py-0.5"
          style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}
          aria-hidden="true"
        >
          SAMPLE
        </div>
      </div>

      {/* 本文エリア */}
      <div className="relative flex gap-4 px-4 py-3">
        {/* 左：写真＋角印 */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          {/* 写真枠 */}
          <div
            style={{
              border: `2px solid ${accent}`,
              padding: 3,
              background: "#fff",
              borderRadius: data.imageShape === "circle" ? "50%" : data.imageShape === "rounded" ? "6px" : "0",
            }}
          >
            <CardImage imageSrc={imgSrc} shape={data.imageShape} size={76} />
          </div>

          {/* 架空角印（明確にFICTIONと書く） */}
          <div
            className="flex items-center justify-center"
            style={{
              width: 52,
              height: 52,
              border: `2px solid ${accent}`,
              borderRadius: 2,
              transform: "rotate(10deg)",
              background: "rgba(139,26,26,0.06)",
              flexShrink: 0,
            }}
            aria-label="架空印（FICTION）"
          >
            <div className="text-center leading-none" style={{ transform: "rotate(-10deg)" }}>
              <div className="text-[9px] font-bold" style={{ color: accent }}>架空</div>
              <div className="text-[7px] font-bold" style={{ color: accent }}>FICTION</div>
            </div>
          </div>
        </div>

        {/* 右：情報 */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* 氏名（フィクション） */}
          <div style={{ borderBottom: `1px solid ${accent}44`, paddingBottom: 4 }}>
            <div className="text-[8px] font-bold tracking-widest" style={{ color: accent }}>
              キャラクター名
            </div>
            <div className="text-lg font-bold leading-tight truncate tracking-wide">
              {data.characterName || "　　　　　　"}
            </div>
            {data.alias && (
              <div className="text-[10px]" style={{ color: "#666" }}>
                通称：{data.alias}
              </div>
            )}
          </div>

          {/* 各フィールド */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {[
              { label: "所属世界", value: data.world },
              { label: "所属機関", value: data.affiliation },
              { label: "称　号", value: data.rank },
              { label: "特　技", value: data.skill },
            ].map(({ label, value }) => (
              <div key={label} style={{ borderBottom: `1px dotted ${accent}33`, paddingBottom: 2 }}>
                <div className="text-[7px] font-bold tracking-wider" style={{ color: accent }}>
                  {label}
                </div>
                <div className="text-[9px] truncate">{value || "　　　"}</div>
              </div>
            ))}
          </div>

          {/* 日付 */}
          <div className="grid grid-cols-3 gap-1 mt-1">
            {[
              { label: "生年月日（架空）", value: formatDate(data.birthDate) },
              { label: "交付日", value: formatDate(data.issueDate) },
              { label: "有効期限", value: formatDate(data.expiryDate) },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[6px] font-bold tracking-wider" style={{ color: accent }}>
                  {label}
                </div>
                <div className="text-[8px]">{value || "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 下部バー */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-1.5"
        style={{ background: `${accent}11`, borderTop: `1px solid ${accent}44` }}
      >
        <span className="text-[7px] font-mono tracking-widest" style={{ color: accent }}>
          No. {data.cardId || "—"}
        </span>
        {data.slogan && (
          <span className="text-[7px] italic text-gray-500 truncate max-w-[200px]">
            「{data.slogan}」
          </span>
        )}
        <span
          className="text-[7px] font-bold tracking-wider"
          style={{ color: accent, opacity: 0.7 }}
          aria-hidden="true"
        >
          架空書類 · 非公式
        </span>
      </div>

      <WatermarkOverlay text={data.watermarkText} />

      {/* 右上バッジ */}
      <div className="absolute right-0 top-8 flex flex-col items-end gap-0.5 p-1.5" aria-label="これはフィクションカードです">
        <span className="rounded bg-red-700 px-1.5 py-0.5 text-[8px] font-black tracking-widest text-white uppercase leading-none">
          NOT AN OFFICIAL ID
        </span>
        <span className="rounded bg-gray-700/70 px-1.5 py-0.5 text-[7px] font-bold text-gray-200 uppercase leading-none">
          FOR ENTERTAINMENT ONLY
        </span>
      </div>
    </div>
  );
}
