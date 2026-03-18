import { CardData } from "@/types/card";
import { formatDate } from "@/lib/utils";
import { CardImage } from "./CardImage";

interface Win95Props {
  data: CardData;
  croppedImageSrc?: string | null;
}

// Classic Windows 95/98 beveled border helpers
const raised = {
  borderTop: "2px solid #ffffff",
  borderLeft: "2px solid #ffffff",
  borderRight: "2px solid #808080",
  borderBottom: "2px solid #808080",
} as const;

const sunken = {
  borderTop: "2px solid #808080",
  borderLeft: "2px solid #808080",
  borderRight: "2px solid #ffffff",
  borderBottom: "2px solid #ffffff",
} as const;

const outerRaised = {
  borderTop: "2px solid #dfdfdf",
  borderLeft: "2px solid #dfdfdf",
  borderRight: "2px solid #404040",
  borderBottom: "2px solid #404040",
} as const;

export function Win95({ data, croppedImageSrc }: Win95Props) {
  const imgSrc = croppedImageSrc ?? data.imageSrc;

  return (
    <div
      className="relative select-none overflow-hidden"
      style={{
        width: 420,
        height: 260,
        background: "#c0c0c0",
        fontFamily: "'MS Sans Serif', 'Tahoma', sans-serif",
        fontSize: 11,
        color: "#000000",
        ...outerRaised,
      }}
      role="img"
      aria-label="Win95 スタイル フィクションカード"
    >
      {/* タイトルバー */}
      <div
        className="flex items-center justify-between px-2"
        style={{
          height: 20,
          background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
          color: "#ffffff",
        }}
      >
        <div className="flex items-center gap-1.5">
          {/* 小さいアイコン代わりの四角 */}
          <div
            className="flex items-center justify-center text-[7px] font-black"
            style={{ width: 14, height: 14, background: "#c0c0c0", color: "#000", ...raised }}
            aria-hidden="true"
          >
            F
          </div>
          <span className="text-[11px] font-bold tracking-wide">
            Fiction Card — {data.characterName || "Untitled"}.fcd
          </span>
        </div>
        {/* ウインドウボタン */}
        <div className="flex gap-1" aria-hidden="true">
          {["—", "□", "×"].map((ch) => (
            <div
              key={ch}
              className="flex items-center justify-center text-[10px] font-black"
              style={{ width: 16, height: 14, background: "#c0c0c0", color: "#000", ...raised }}
            >
              {ch}
            </div>
          ))}
        </div>
      </div>

      {/* メニューバー */}
      <div
        className="flex items-center gap-3 px-2"
        style={{ height: 18, background: "#c0c0c0", borderBottom: "1px solid #808080" }}
        aria-hidden="true"
      >
        {["ファイル(F)", "編集(E)", "表示(V)", "ヘルプ(H)"].map((m) => (
          <span key={m} className="text-[10px] cursor-default hover:bg-[#000080] hover:text-white px-1">
            {m}
          </span>
        ))}
      </div>

      {/* 本文 */}
      <div className="flex gap-3 px-3 py-2" style={{ marginTop: 2 }}>
        {/* 左：写真 */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
          <div style={{ ...sunken, padding: 2, background: "#ffffff" }}>
            <CardImage imageSrc={imgSrc} shape={data.imageShape} size={80} />
          </div>
          {/* SAMPLE スタンプ */}
          <div
            className="text-center text-[8px] font-black tracking-widest px-2 py-0.5"
            style={{ border: "2px solid #808080", color: "#800000", background: "#c0c0c0" }}
            aria-hidden="true"
          >
            SAMPLE
          </div>
        </div>

        {/* 右：フォームフィールド */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* グループボックス */}
          <div style={{ ...raised, padding: "4px 6px", background: "#c0c0c0" }}>
            <div className="text-[9px] font-bold mb-1" style={{ color: "#000080" }}>
              ─── キャラクター情報（架空） ───
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {[
                { label: "名前:", value: data.characterName },
                { label: "通称:", value: data.alias },
                { label: "世界:", value: data.world },
                { label: "所属:", value: data.affiliation },
                { label: "称号:", value: data.rank },
                { label: "能力:", value: data.skill },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-1">
                  <span className="text-[9px] font-bold flex-shrink-0">{label}</span>
                  <div
                    className="flex-1 text-[9px] px-1 truncate"
                    style={{ ...sunken, background: "#ffffff", minWidth: 0 }}
                  >
                    {value || ""}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 日付フィールド */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "生年月日:", value: formatDate(data.birthDate) },
              { label: "交付日:", value: formatDate(data.issueDate) },
              { label: "有効期限:", value: formatDate(data.expiryDate) },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[8px] font-bold">{label}</span>
                <div
                  className="text-[8px] px-1 text-center"
                  style={{ ...sunken, background: "#ffffff" }}
                >
                  {value || "　"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ステータスバー */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2"
        style={{
          height: 18,
          borderTop: "1px solid #808080",
          background: "#c0c0c0",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[9px]" style={{ ...sunken, padding: "0 4px" }}>
            ID: {data.cardId || "—"}
          </span>
          <span className="text-[9px] text-red-800 font-bold">NOT AN OFFICIAL ID</span>
        </div>
        <span className="text-[8px] italic text-gray-600 truncate max-w-[140px]">
          {data.slogan || "FOR ENTERTAINMENT ONLY"}
        </span>
      </div>

      {/* 透かし */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="select-none whitespace-nowrap text-5xl font-black tracking-widest opacity-[0.06] rotate-[-30deg] uppercase"
          style={{ color: "#000080" }}
        >
          {data.watermarkText || "FAN CARD"}
        </span>
      </div>
    </div>
  );
}
