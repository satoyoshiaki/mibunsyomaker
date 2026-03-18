"use client";

import { CardData } from "@/types/card";
import { NeonLicense } from "./NeonLicense";
import { CivicProfile } from "./CivicProfile";
import { TravelPass } from "./TravelPass";
import { JpFormal } from "./JpFormal";
import { Win95 } from "./Win95";
import { WinXP } from "./WinXP";
import { WinAero } from "./WinAero";

interface CardTemplateProps {
  data: CardData;
  croppedImageSrc?: string | null;
}

export function CardTemplate({ data, croppedImageSrc }: CardTemplateProps) {
  switch (data.template) {
    case "neon-license":
      return <NeonLicense data={data} croppedImageSrc={croppedImageSrc} />;
    case "civic-profile":
      return <CivicProfile data={data} croppedImageSrc={croppedImageSrc} />;
    case "travel-pass":
      return <TravelPass data={data} croppedImageSrc={croppedImageSrc} />;
    case "jp-formal":
      return <JpFormal data={data} croppedImageSrc={croppedImageSrc} />;
    case "win95":
      return <Win95 data={data} croppedImageSrc={croppedImageSrc} />;
    case "winxp":
      return <WinXP data={data} croppedImageSrc={croppedImageSrc} />;
    case "win-aero":
      return <WinAero data={data} croppedImageSrc={croppedImageSrc} />;
    default:
      return <NeonLicense data={data} croppedImageSrc={croppedImageSrc} />;
  }
}
