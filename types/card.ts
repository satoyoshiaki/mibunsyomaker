export type TemplateId =
  | "neon-license"
  | "civic-profile"
  | "travel-pass"
  | "jp-formal"
  | "win95"
  | "winxp"
  | "win-aero";

export type ImageShape = "circle" | "rounded" | "square";

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CardData {
  // Template
  template: TemplateId;

  // Image
  imageSrc: string | null;
  cropArea: CropArea | null;
  imageZoom: number;
  imageShape: ImageShape;

  // Character info
  characterName: string;
  alias: string;
  world: string;
  affiliation: string;
  rank: string;
  skill: string;
  birthDate: string;
  issueDate: string;
  expiryDate: string;
  cardId: string;
  signature: string;
  slogan: string;
  favoriteColor: string;
  watermarkText: string;
}

export const SAMPLE_CARD_DATA: CardData = {
  template: "neon-license",
  imageSrc: null,
  cropArea: null,
  imageZoom: 1,
  imageShape: "rounded",
  characterName: "Hikari Astraea",
  alias: "Nova",
  world: "Stellar Horizon",
  affiliation: "Celestial Corps",
  rank: "Captain",
  skill: "Photon Manipulation",
  birthDate: "2187-03-14",
  issueDate: "2210-01-01",
  expiryDate: "2215-12-31",
  cardId: "CC-4872-NOVA",
  signature: "H. Astraea",
  slogan: "Light guides the way.",
  favoriteColor: "#6366f1",
  watermarkText: "FAN CARD",
};
