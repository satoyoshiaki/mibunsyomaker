import { CardData } from "@/types/card";
import { formatDate } from "@/lib/utils";
import { WatermarkOverlay, CornerBadge } from "./WatermarkOverlay";
import { CardImage } from "./CardImage";

interface NeonLicenseProps {
  data: CardData;
  croppedImageSrc?: string | null;
}

export function NeonLicense({ data, croppedImageSrc }: NeonLicenseProps) {
  const imgSrc = croppedImageSrc ?? data.imageSrc;
  const accentColor = data.favoriteColor || "#6366f1";

  return (
    <div
      className="relative overflow-hidden rounded-2xl font-mono select-none"
      style={{
        width: 420,
        height: 260,
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 50%, #0f0c29 100%)",
        border: `2px solid ${accentColor}`,
        boxShadow: `0 0 20px ${accentColor}55, inset 0 0 40px #ffffff08`,
        color: "#e2e8f0",
      }}
      role="img"
      aria-label="Neon License フィクションカード"
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
        aria-hidden="true"
      />

      {/* Top bar */}
      <div
        className="relative flex items-center justify-between px-4 py-2"
        style={{ borderBottom: `1px solid ${accentColor}44`, background: `${accentColor}22` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded-sm flex items-center justify-center text-[7px] font-black"
            style={{ background: accentColor, color: "#fff" }}
            aria-hidden="true"
          >
            FC
          </div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: accentColor }}>
            Fiction License
          </span>
        </div>
        <span className="text-[9px] tracking-widest opacity-60">SAMPLE · NOT OFFICIAL</span>
      </div>

      {/* Body */}
      <div className="relative flex gap-4 px-4 py-3">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div
            className="p-0.5"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, transparent)`,
              borderRadius: data.imageShape === "circle" ? "50%" : data.imageShape === "rounded" ? "12px" : "4px",
            }}
            aria-hidden="true"
          >
            <CardImage
              imageSrc={imgSrc}
              shape={data.imageShape}
              size={90}
              className="border-0"
            />
          </div>
          <div className="mt-1.5 text-center">
            <span
              className="text-[8px] font-bold italic tracking-wide"
              style={{ color: accentColor }}
            >
              {data.signature || "— —"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-1">
          <div>
            <div
              className="text-[8px] font-bold tracking-[0.2em] uppercase opacity-60"
              style={{ color: accentColor }}
            >
              Character Name
            </div>
            <div className="text-base font-bold tracking-wide truncate leading-tight">
              {data.characterName || "—"}
            </div>
            {data.alias && (
              <div className="text-[10px] opacity-60 truncate">
                aka &quot;{data.alias}&quot;
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {[
              { label: "World", value: data.world },
              { label: "Affiliation", value: data.affiliation },
              { label: "Rank", value: data.rank },
              { label: "Skill", value: data.skill },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[7px] font-bold tracking-widest uppercase opacity-50" style={{ color: accentColor }}>
                  {label}
                </div>
                <div className="text-[9px] truncate">{value || "—"}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-x-2 mt-1">
            <div>
              <div className="text-[7px] font-bold tracking-widest uppercase opacity-50" style={{ color: accentColor }}>
                Born
              </div>
              <div className="text-[8px]">{formatDate(data.birthDate) || "—"}</div>
            </div>
            <div>
              <div className="text-[7px] font-bold tracking-widest uppercase opacity-50" style={{ color: accentColor }}>
                Issued
              </div>
              <div className="text-[8px]">{formatDate(data.issueDate) || "—"}</div>
            </div>
            <div>
              <div className="text-[7px] font-bold tracking-widest uppercase opacity-50" style={{ color: accentColor }}>
                Expires
              </div>
              <div className="text-[8px]">{formatDate(data.expiryDate) || "—"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-1.5"
        style={{ borderTop: `1px solid ${accentColor}33`, background: `${accentColor}11` }}
      >
        <span className="text-[8px] tracking-widest opacity-50">ID: {data.cardId || "—"}</span>
        {data.slogan && (
          <span className="text-[8px] italic opacity-60 truncate max-w-[180px]">
            &ldquo;{data.slogan}&rdquo;
          </span>
        )}
      </div>

      <WatermarkOverlay text={data.watermarkText} />
      <CornerBadge />
    </div>
  );
}
