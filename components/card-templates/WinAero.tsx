import { CardData } from "@/types/card";
import { formatDate } from "@/lib/utils";
import { CardImage } from "./CardImage";

interface WinAeroProps {
  data: CardData;
  croppedImageSrc?: string | null;
}

export function WinAero({ data, croppedImageSrc }: WinAeroProps) {
  const imgSrc = croppedImageSrc ?? data.imageSrc;
  const accent = data.favoriteColor || "#3291ff";

  return (
    <div
      className="relative select-none overflow-hidden"
      style={{
        width: 420,
        height: 260,
        fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
        color: "#ffffff",
        borderRadius: "8px 8px 4px 4px",
        border: `1px solid ${accent}88`,
        boxShadow: `0 8px 32px #00000088, 0 0 0 1px #ffffff22 inset`,
        /* Aero glass: 半透明ダーク */
        background:
          "linear-gradient(180deg, rgba(30,40,60,0.92) 0%, rgba(15,20,35,0.96) 100%)",
      }}
      role="img"
      aria-label="Windows 7 Aero スタイル フィクションカード"
    >
      {/* ガラス光沢ハイライト（上部） */}
      <div
        className="absolute left-0 right-0 top-0 pointer-events-none"
        style={{
          height: 40,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)",
          borderRadius: "8px 8px 0 0",
        }}
        aria-hidden="true"
      />

      {/* タイトルバー */}
      <div
        className="flex items-center justify-between px-3"
        style={{
          height: 32,
          background: "rgba(20,28,48,0.5)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center gap-2">
          {/* グローアイコン */}
          <div
            className="flex items-center justify-center text-[8px] font-black rounded"
            style={{
              width: 16, height: 16,
              background: `radial-gradient(circle, ${accent} 0%, ${accent}88 100%)`,
              boxShadow: `0 0 6px ${accent}`,
            }}
            aria-hidden="true"
          >
            F
          </div>
          <span className="text-[12px] font-light tracking-wide text-white/90 drop-shadow">
            Fiction Card — {data.characterName || "Untitled"}
          </span>
        </div>

        {/* Aero ウインドウボタン */}
        <div className="flex gap-1.5" aria-hidden="true">
          {/* 最小化・最大化 */}
          {["—", "□"].map((ch) => (
            <div
              key={ch}
              className="flex items-center justify-center text-[10px] text-white/80 rounded"
              style={{
                width: 26, height: 18,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {ch}
            </div>
          ))}
          {/* 閉じる（赤グロー） */}
          <div
            className="flex items-center justify-center text-[11px] font-bold text-white rounded"
            style={{
              width: 26, height: 18,
              background:
                "linear-gradient(180deg, rgba(200,50,40,0.8) 0%, rgba(160,30,20,0.9) 100%)",
              border: "1px solid rgba(220,80,70,0.6)",
              boxShadow: "0 0 4px rgba(200,50,40,0.4)",
            }}
          >
            ×
          </div>
        </div>
      </div>

      {/* 本文 */}
      <div className="flex gap-4 px-4 py-3">
        {/* 左：写真 */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          {/* グロー枠 */}
          <div
            style={{
              padding: 3,
              borderRadius: data.imageShape === "circle" ? "50%" : data.imageShape === "rounded" ? "10px" : "2px",
              background: `linear-gradient(135deg, ${accent}88, transparent)`,
              boxShadow: `0 0 12px ${accent}55`,
            }}
          >
            <CardImage imageSrc={imgSrc} shape={data.imageShape} size={80} />
          </div>

          {/* シグネチャ */}
          <div
            className="text-[9px] italic text-center text-white/70"
            style={{ maxWidth: 86 }}
          >
            {data.signature || "—"}
          </div>

          {/* SAMPLE */}
          <div
            className="text-[8px] font-black tracking-widest px-2 py-0.5 rounded"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: `1px solid ${accent}66`,
              color: accent,
              boxShadow: `0 0 6px ${accent}44`,
            }}
            aria-hidden="true"
          >
            SAMPLE
          </div>
        </div>

        {/* 右：情報 */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* 名前 */}
          <div
            className="pb-1.5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
          >
            <div className="text-[8px] font-bold tracking-widest uppercase" style={{ color: accent }}>
              Character Name
            </div>
            <div className="text-lg font-light tracking-wide truncate text-white drop-shadow">
              {data.characterName || "—"}
            </div>
            {data.alias && (
              <div className="text-[10px] text-white/50 italic">
                &quot;{data.alias}&quot;
              </div>
            )}
          </div>

          {/* フィールドグリッド */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {[
              { label: "World", value: data.world },
              { label: "Affiliation", value: data.affiliation },
              { label: "Rank", value: data.rank },
              { label: "Skill", value: data.skill },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  className="text-[7px] font-bold tracking-widest uppercase mb-0.5"
                  style={{ color: accent }}
                >
                  {label}
                </div>
                <div
                  className="text-[9px] truncate px-1.5 py-0.5 rounded text-white/85"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {value || "—"}
                </div>
              </div>
            ))}
          </div>

          {/* 日付 */}
          <div className="grid grid-cols-3 gap-1">
            {[
              { label: "Born", value: formatDate(data.birthDate) },
              { label: "Issued", value: formatDate(data.issueDate) },
              { label: "Expires", value: formatDate(data.expiryDate) },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[7px] font-bold uppercase" style={{ color: accent }}>
                  {label}
                </div>
                <div className="text-[8px] text-white/70">{value || "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ステータスバー */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-1.5"
        style={{
          background: "rgba(0,0,0,0.4)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span className="text-[8px] font-mono" style={{ color: accent }}>
          {data.cardId || "—"}
        </span>
        {data.slogan && (
          <span className="text-[8px] italic text-white/50 truncate max-w-[160px]">
            &ldquo;{data.slogan}&rdquo;
          </span>
        )}
        <span className="text-[8px] text-red-400 font-bold">NOT AN OFFICIAL ID</span>
      </div>

      {/* 透かし */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="select-none whitespace-nowrap text-5xl font-black tracking-widest rotate-[-30deg] uppercase"
          style={{ color: "#ffffff", opacity: 0.04 }}
        >
          {data.watermarkText || "FAN CARD"}
        </span>
      </div>

      {/* 右上バッジ */}
      <div className="absolute right-0 top-8 flex flex-col items-end gap-0.5 p-1.5" aria-label="これはフィクションカードです">
        <span className="rounded bg-red-600/80 px-1.5 py-0.5 text-[8px] font-black tracking-widest text-white uppercase leading-none backdrop-blur-sm">
          NOT AN OFFICIAL ID
        </span>
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[7px] font-bold text-white/70 uppercase leading-none">
          FOR ENTERTAINMENT ONLY
        </span>
      </div>
    </div>
  );
}
