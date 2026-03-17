import { CardData } from "@/types/card";
import { formatDate } from "@/lib/utils";
import { WatermarkOverlay, CornerBadge } from "./WatermarkOverlay";
import { CardImage } from "./CardImage";

interface CivicProfileProps {
  data: CardData;
  croppedImageSrc?: string | null;
}

export function CivicProfile({ data, croppedImageSrc }: CivicProfileProps) {
  const imgSrc = croppedImageSrc ?? data.imageSrc;
  const accent = data.favoriteColor || "#0d9488";

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        width: 420,
        height: 260,
        background: "#f8fafc",
        borderRadius: 12,
        boxShadow: "0 4px 24px #00000022",
        fontFamily: "Georgia, serif",
        color: "#1e293b",
      }}
      role="img"
      aria-label="Civic Profile フィクションカード"
    >
      {/* Left panel */}
      <div
        className="absolute left-0 top-0 bottom-0 flex flex-col items-center justify-center gap-3 px-5"
        style={{
          width: 130,
          background: `linear-gradient(180deg, ${accent} 0%, ${accent}cc 100%)`,
        }}
      >
        <div
          className="text-[7px] font-bold tracking-[0.25em] text-white uppercase text-center leading-relaxed"
          aria-hidden="true"
        >
          CIVIC
          <br />
          PROFILE
          <br />
          CARD
        </div>
        <div
          style={{
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: data.imageShape === "circle" ? "50%" : data.imageShape === "rounded" ? "10px" : "2px",
            padding: 2,
          }}
        >
          <CardImage imageSrc={imgSrc} shape={data.imageShape} size={74} />
        </div>
        <div className="text-center">
          <div className="text-[8px] text-white opacity-80 italic">
            {data.signature || "—"}
          </div>
        </div>
        <div
          className="rounded px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest"
          style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
          aria-hidden="true"
        >
          SAMPLE
        </div>
      </div>

      {/* Main content */}
      <div className="absolute right-0 top-0 bottom-0" style={{ left: 130 }}>
        {/* Header */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderBottom: `2px solid ${accent}33` }}
        >
          <div>
            <div
              className="text-[8px] font-bold tracking-widest uppercase"
              style={{ color: accent }}
            >
              {data.world || "Fiction World"}
            </div>
            <div className="text-[9px] text-gray-500">
              {data.affiliation || "Independent"}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[7px] text-gray-400 uppercase tracking-wider">Card ID</div>
            <div className="text-[9px] font-mono font-bold text-gray-700">
              {data.cardId || "—"}
            </div>
          </div>
        </div>

        {/* Name block */}
        <div className="px-5 pt-3 pb-2">
          <div className="text-[7px] uppercase tracking-widest text-gray-400 font-bold">
            Character Name
          </div>
          <div className="text-xl font-bold leading-tight text-gray-900 truncate">
            {data.characterName || "—"}
          </div>
          {data.alias && (
            <div className="text-xs text-gray-500 italic">
              &ldquo;{data.alias}&rdquo;
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="px-5 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {[
            { label: "Rank / Class", value: data.rank },
            { label: "Ability / Skill", value: data.skill },
            { label: "Date of Birth", value: formatDate(data.birthDate) },
            { label: "Series", value: data.world },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-[7px] font-bold uppercase tracking-widest text-gray-400">{label}</div>
              <div className="text-[10px] font-medium truncate text-gray-800">{value || "—"}</div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-2"
          style={{ borderTop: `1px solid ${accent}22` }}
        >
          <div className="text-[7px] text-gray-400">
            Issued: {formatDate(data.issueDate) || "—"} &nbsp;|&nbsp; Exp: {formatDate(data.expiryDate) || "—"}
          </div>
          {data.slogan && (
            <div className="text-[7px] italic text-gray-400 truncate max-w-[120px]">
              {data.slogan}
            </div>
          )}
        </div>
      </div>

      <WatermarkOverlay text={data.watermarkText} />
      <CornerBadge />
    </div>
  );
}
