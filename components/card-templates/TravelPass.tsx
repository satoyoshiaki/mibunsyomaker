import { CardData } from "@/types/card";
import { formatDate } from "@/lib/utils";
import { WatermarkOverlay, CornerBadge } from "./WatermarkOverlay";
import { CardImage } from "./CardImage";

interface TravelPassProps {
  data: CardData;
  croppedImageSrc?: string | null;
}

export function TravelPass({ data, croppedImageSrc }: TravelPassProps) {
  const imgSrc = croppedImageSrc ?? data.imageSrc;
  const accent = data.favoriteColor || "#d97706";

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        width: 420,
        height: 260,
        borderRadius: 8,
        boxShadow: "0 4px 24px #00000033",
        background: "#fef3c7",
        color: "#292524",
        fontFamily: "'Times New Roman', Times, serif",
        border: `3px solid ${accent}`,
      }}
      role="img"
      aria-label="Travel Archive Pass フィクションカード"
    >
      {/* Top ornament bar */}
      <div
        className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center gap-4"
        style={{ background: accent }}
        aria-hidden="true"
      >
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.4)" }} />
        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-white">
          ✦ Travel Archive Pass ✦
        </span>
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.4)" }} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 top-8 flex gap-4 px-5 py-3">
        {/* Left: Photo + signature */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div
            style={{
              border: `2px solid ${accent}`,
              padding: 3,
              borderRadius: data.imageShape === "circle" ? "50%" : data.imageShape === "rounded" ? "8px" : "0",
              background: "#fff",
            }}
          >
            <CardImage imageSrc={imgSrc} shape={data.imageShape} size={82} />
          </div>
          {/* Decorative stamp */}
          <div
            className="flex flex-col items-center"
            style={{
              width: 56,
              height: 22,
              border: `1.5px solid ${accent}`,
              borderRadius: 3,
              justifyContent: "center",
              background: "rgba(255,255,255,0.6)",
            }}
            aria-hidden="true"
          >
            <span className="text-[7px] font-bold tracking-widest uppercase" style={{ color: accent }}>
              SAMPLE
            </span>
          </div>
          <div
            className="text-[9px] italic text-center"
            style={{ color: "#78716c", maxWidth: 90 }}
          >
            {data.signature || "—"}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1 min-w-0">
          {/* Name */}
          <div className="mb-2">
            <div
              className="text-[8px] tracking-widest uppercase font-bold"
              style={{ color: accent }}
            >
              Traveler Name
            </div>
            <div className="text-lg font-bold leading-tight truncate">
              {data.characterName || "—"}
            </div>
            {data.alias && (
              <div className="text-xs italic text-gray-600">
                known as &ldquo;{data.alias}&rdquo;
              </div>
            )}
          </div>

          {/* Grid info */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {[
              { label: "Home World", value: data.world },
              { label: "Guild / Order", value: data.affiliation },
              { label: "Title", value: data.rank },
              { label: "Special Art", value: data.skill },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  className="text-[7px] font-bold uppercase tracking-widest"
                  style={{ color: accent }}
                >
                  {label}
                </div>
                <div className="text-[9px] truncate text-gray-800">{value || "—"}</div>
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="mt-2 flex gap-4 text-[8px]">
            <div>
              <span className="font-bold uppercase tracking-wider" style={{ color: accent }}>
                Born:{" "}
              </span>
              {formatDate(data.birthDate) || "—"}
            </div>
            <div>
              <span className="font-bold uppercase tracking-wider" style={{ color: accent }}>
                Valid:{" "}
              </span>
              {formatDate(data.issueDate) || "—"} – {formatDate(data.expiryDate) || "—"}
            </div>
          </div>

          {data.slogan && (
            <div className="mt-1 text-[8px] italic text-gray-600">
              &ldquo;{data.slogan}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* Bottom band */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-1.5"
        style={{ background: `${accent}22`, borderTop: `1px solid ${accent}44` }}
        aria-hidden="true"
      >
        <span className="text-[8px] font-mono tracking-widest text-gray-600">
          PASS-ID: {data.cardId || "—"}
        </span>
        <span className="text-[8px] tracking-widest uppercase" style={{ color: accent }}>
          ✦ Fiction Card — Not Official ✦
        </span>
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-8 left-0 p-2 opacity-30" aria-hidden="true">
        <div className="h-4 w-4 border-l-2 border-t-2" style={{ borderColor: accent }} />
      </div>
      <div className="absolute top-8 right-0 p-2 opacity-30" aria-hidden="true">
        <div className="h-4 w-4 border-r-2 border-t-2" style={{ borderColor: accent }} />
      </div>
      <div className="absolute bottom-6 left-0 p-2 opacity-30" aria-hidden="true">
        <div className="h-4 w-4 border-l-2 border-b-2" style={{ borderColor: accent }} />
      </div>
      <div className="absolute bottom-6 right-0 p-2 opacity-30" aria-hidden="true">
        <div className="h-4 w-4 border-r-2 border-b-2" style={{ borderColor: accent }} />
      </div>

      <WatermarkOverlay text={data.watermarkText} />
      <CornerBadge />
    </div>
  );
}
