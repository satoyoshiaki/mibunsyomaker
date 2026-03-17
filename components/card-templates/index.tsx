"use client";

import { CardData } from "@/types/card";
import { NeonLicense } from "./NeonLicense";
import { CivicProfile } from "./CivicProfile";
import { TravelPass } from "./TravelPass";

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
    default:
      return <NeonLicense data={data} croppedImageSrc={croppedImageSrc} />;
  }
}
