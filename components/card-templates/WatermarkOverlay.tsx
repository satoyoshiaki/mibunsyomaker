interface WatermarkOverlayProps {
  text: string;
}

export function WatermarkOverlay({ text }: WatermarkOverlayProps) {
  const displayText = text || "FAN CARD";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <span
        className="select-none whitespace-nowrap text-5xl font-black tracking-widest opacity-[0.08] rotate-[-30deg] uppercase"
        style={{ color: "currentColor" }}
      >
        {displayText}
      </span>
    </div>
  );
}

export function CornerBadge() {
  return (
    <div
      aria-label="これはフィクションカードです"
      className="absolute right-0 top-0 flex flex-col items-end gap-0.5 p-2"
    >
      <span className="rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-black tracking-widest text-white uppercase leading-none">
        NOT AN OFFICIAL ID
      </span>
      <span className="rounded bg-gray-800/70 px-1.5 py-0.5 text-[8px] font-bold text-gray-300 uppercase leading-none">
        FOR ENTERTAINMENT ONLY
      </span>
    </div>
  );
}
