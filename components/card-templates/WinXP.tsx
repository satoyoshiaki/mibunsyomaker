import { CardData } from "@/types/card";
import { formatDate } from "@/lib/utils";
import { CardImage } from "./CardImage";

interface WinXPProps {
  data: CardData;
  croppedImageSrc?: string | null;
}

export function WinXP({ data, croppedImageSrc }: WinXPProps) {
  const imgSrc = croppedImageSrc ?? data.imageSrc;

  return (
    <div
      className="relative select-none overflow-hidden"
      style={{
        width: 420,
        height: 260,
        fontFamily: "'Tahoma', 'Segoe UI', sans-serif",
        fontSize: 11,
        color: "#000000",
        /* XP Luna の外枠：角丸＋ブルーグラデ */
        borderRadius: "8px 8px 4px 4px",
        border: "2px solid #003c74",
        boxShadow: "0 4px 16px #00000055",
      }}
      role="img"
      aria-label="Windows XP スタイル フィクションカード"
    >
      {/* タイトルバー（XP Luna Blue） */}
      <div
        className="flex items-center justify-between px-2"
        style={{
          height: 28,
          background: "linear-gradient(180deg, #4e9be1 0%, #2564c1 40%, #1952a8 70%, #2564c1 100%)",
          borderRadius: "6px 6px 0 0",
          color: "#ffffff",
        }}
      >
        <div className="flex items-center gap-1.5">
          {/* XP アイコン風 */}
          <div
            className="flex items-center justify-center rounded-sm text-[8px] font-black"
            style={{
              width: 16, height: 16,
              background: "linear-gradient(135deg, #4de34d 0%, #1a9a1a 100%)",
              color: "#fff",
            }}
            aria-hidden="true"
          >
            F
          </div>
          <span className="text-[12px] font-bold drop-shadow">
            Fiction Card — {data.characterName || "Untitled"}
          </span>
        </div>

        {/* XP ウインドウボタン */}
        <div className="flex gap-1" aria-hidden="true">
          {/* 最小化 */}
          <div
            className="flex items-center justify-center rounded-sm text-[10px] font-black text-white"
            style={{
              width: 20, height: 16,
              background: "linear-gradient(180deg, #6ab0e8 0%, #3a7ec8 50%, #2a6ab8 100%)",
              border: "1px solid #1040a0",
            }}
          >
            —
          </div>
          {/* 最大化 */}
          <div
            className="flex items-center justify-center rounded-sm text-[9px] font-black text-white"
            style={{
              width: 20, height: 16,
              background: "linear-gradient(180deg, #6ab0e8 0%, #3a7ec8 50%, #2a6ab8 100%)",
              border: "1px solid #1040a0",
            }}
          >
            □
          </div>
          {/* 閉じる（赤） */}
          <div
            className="flex items-center justify-center rounded-sm text-[10px] font-black text-white"
            style={{
              width: 20, height: 16,
              background: "linear-gradient(180deg, #e87060 0%, #c03020 50%, #a02010 100%)",
              border: "1px solid #801010",
            }}
          >
            ×
          </div>
        </div>
      </div>

      {/* コンテンツ背景 */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          top: 28,
          background: "linear-gradient(180deg, #ece9d8 0%, #d4d0c8 100%)",
        }}
      >
        {/* タスクパネル（左のXP青パネル） */}
        <div
          className="absolute top-0 bottom-0 left-0 flex flex-col items-center py-3 gap-2"
          style={{
            width: 120,
            background: "linear-gradient(180deg, #3168c0 0%, #1040a0 100%)",
            borderRight: "1px solid #1030a0",
          }}
        >
          {/* 写真 */}
          <div
            className="flex-shrink-0"
            style={{
              border: "2px solid #8ab0e8",
              padding: 3,
              borderRadius: data.imageShape === "circle" ? "50%" : data.imageShape === "rounded" ? "8px" : "2px",
              background: "#fff",
            }}
          >
            <CardImage imageSrc={imgSrc} shape={data.imageShape} size={70} />
          </div>

          {/* 名前（白文字） */}
          <div className="text-center px-2">
            <div className="text-[11px] font-bold text-white leading-tight truncate w-full">
              {data.characterName || "—"}
            </div>
            {data.alias && (
              <div className="text-[9px] text-blue-200 truncate">
                &quot;{data.alias}&quot;
              </div>
            )}
          </div>

          {/* SAMPLE バッジ */}
          <div
            className="text-[8px] font-black tracking-widest px-2 py-0.5 mt-auto"
            style={{
              background: "#ffdd00",
              color: "#000",
              border: "1px solid #c0a000",
            }}
            aria-hidden="true"
          >
            SAMPLE
          </div>
        </div>

        {/* メイン情報エリア */}
        <div
          className="absolute top-0 bottom-0 right-0 p-3 flex flex-col justify-between"
          style={{ left: 120 }}
        >
          {/* フィールドグリッド */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {[
              { label: "Series / World", value: data.world },
              { label: "Affiliation", value: data.affiliation },
              { label: "Rank / Class", value: data.rank },
              { label: "Skill / Ability", value: data.skill },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[8px] font-bold text-blue-900">{label}</div>
                <div
                  className="text-[9px] px-1 py-0.5 truncate"
                  style={{
                    background: "#fff",
                    border: "1px solid #7f9db9",
                    boxShadow: "inset 1px 1px 2px #0002",
                  }}
                >
                  {value || ""}
                </div>
              </div>
            ))}
          </div>

          {/* 日付行 */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Birth Date", value: formatDate(data.birthDate) },
              { label: "Issued", value: formatDate(data.issueDate) },
              { label: "Expires", value: formatDate(data.expiryDate) },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[7px] font-bold text-blue-900">{label}</div>
                <div
                  className="text-[8px] px-1 py-0.5 text-center"
                  style={{
                    background: "#fff",
                    border: "1px solid #7f9db9",
                    boxShadow: "inset 1px 1px 2px #0002",
                  }}
                >
                  {value || "—"}
                </div>
              </div>
            ))}
          </div>

          {/* ステータスバー */}
          <div
            className="flex items-center justify-between px-1"
            style={{
              height: 18,
              background: "linear-gradient(180deg, #ece9d8 0%, #d4d0c8 100%)",
              borderTop: "1px solid #aca899",
            }}
          >
            <span
              className="text-[8px] px-1"
              style={{ border: "1px solid #aca899", background: "#fff" }}
            >
              ID: {data.cardId || "—"}
            </span>
            <span className="text-[8px] text-red-800 font-bold">NOT AN OFFICIAL ID</span>
          </div>
        </div>
      </div>

      {/* 透かし */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="select-none whitespace-nowrap text-5xl font-black tracking-widest opacity-[0.05] rotate-[-30deg] uppercase"
          style={{ color: "#1040a0" }}
        >
          {data.watermarkText || "FAN CARD"}
        </span>
      </div>
    </div>
  );
}
