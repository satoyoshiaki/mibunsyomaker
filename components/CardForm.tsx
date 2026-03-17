"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCw, Shuffle } from "lucide-react";
import { cardFormSchema, CardFormValues } from "@/lib/schema";
import { CardData, SAMPLE_CARD_DATA, ImageShape, TemplateId } from "@/types/card";
import { generateCardId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TemplateSelector } from "@/components/TemplateSelector";
import { ImageUploader } from "@/components/ImageUploader";
import { CropDialog } from "@/components/CropDialog";
import { getCroppedImg } from "@/lib/getCroppedImg";
import { CropArea } from "@/types/card";

interface CardFormProps {
  data: CardData;
  onChange: (data: CardData) => void;
  onCroppedImageChange: (src: string | null) => void;
}

const IMAGE_SHAPES: { value: ImageShape; label: string }[] = [
  { value: "circle", label: "丸型" },
  { value: "rounded", label: "角丸" },
  { value: "square", label: "四角" },
];

export function CardForm({ data, onChange, onCroppedImageChange }: CardFormProps) {
  const [cropOpen, setCropOpen] = useState(false);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      template: data.template,
      imageShape: data.imageShape,
      characterName: data.characterName,
      alias: data.alias,
      world: data.world,
      affiliation: data.affiliation,
      rank: data.rank,
      skill: data.skill,
      birthDate: data.birthDate,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      cardId: data.cardId,
      signature: data.signature,
      slogan: data.slogan,
      favoriteColor: data.favoriteColor,
      watermarkText: data.watermarkText,
    },
  });

  const updateField = <K extends keyof CardFormValues>(key: K, value: CardFormValues[K]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue(key, value as any);
    onChange({ ...data, [key]: value });
  };

  const handleTemplateChange = (id: TemplateId) => {
    setValue("template", id);
    onChange({ ...data, template: id });
  };

  const handleImageChange = (src: string | null) => {
    onChange({ ...data, imageSrc: src, cropArea: null });
    onCroppedImageChange(null);
  };

  const handleCropApply = async (cropArea: CropArea, zoom: number) => {
    if (!data.imageSrc) return;
    try {
      const cropped = await getCroppedImg(data.imageSrc, cropArea, 300);
      onChange({ ...data, cropArea, imageZoom: zoom });
      onCroppedImageChange(cropped);
    } catch {
      // crop failed silently
    }
  };

  const handleReset = () => {
    const fresh = { ...SAMPLE_CARD_DATA };
    reset({
      template: fresh.template,
      imageShape: fresh.imageShape,
      characterName: fresh.characterName,
      alias: fresh.alias,
      world: fresh.world,
      affiliation: fresh.affiliation,
      rank: fresh.rank,
      skill: fresh.skill,
      birthDate: fresh.birthDate,
      issueDate: fresh.issueDate,
      expiryDate: fresh.expiryDate,
      cardId: fresh.cardId,
      signature: fresh.signature,
      slogan: fresh.slogan,
      favoriteColor: fresh.favoriteColor,
      watermarkText: fresh.watermarkText,
    });
    onChange(fresh);
    onCroppedImageChange(null);
  };

  const watchedValues = watch();

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex-1"
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          サンプルデータ投入
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newId = generateCardId();
            updateField("cardId", newId);
          }}
        >
          <Shuffle className="mr-2 h-4 w-4" aria-hidden="true" />
          ID生成
        </Button>
      </div>

      {/* Template */}
      <TemplateSelector value={watchedValues.template} onChange={handleTemplateChange} />

      {/* Image */}
      <section aria-labelledby="image-section-label">
        <h3 id="image-section-label" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          キャラクター画像
        </h3>
        <ImageUploader
          imageSrc={data.imageSrc}
          onImageChange={handleImageChange}
          onOpenCrop={() => setCropOpen(true)}
        />

        {/* Image shape */}
        <fieldset className="mt-3">
          <legend className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
            フレーム形状
          </legend>
          <div className="flex gap-2">
            {IMAGE_SHAPES.map((shape) => (
              <button
                key={shape.value}
                type="button"
                role="radio"
                aria-checked={watchedValues.imageShape === shape.value}
                onClick={() => {
                  setValue("imageShape", shape.value);
                  onChange({ ...data, imageShape: shape.value });
                }}
                className={`flex-1 rounded border py-1.5 text-xs font-medium transition-colors ${
                  watchedValues.imageShape === shape.value
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
                }`}
              >
                {shape.label}
              </button>
            ))}
          </div>
        </fieldset>
      </section>

      {/* Form fields */}
      <section aria-labelledby="character-section-label">
        <h3 id="character-section-label" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          キャラクター情報
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormField
            id="characterName"
            label="Character Name"
            error={errors.characterName?.message}
          >
            <Input
              id="characterName"
              {...register("characterName")}
              onChange={(e) => updateField("characterName", e.target.value)}
              placeholder="例: Hikari Astraea"
              aria-invalid={!!errors.characterName}
            />
          </FormField>

          <FormField id="alias" label="Alias / Nickname" error={errors.alias?.message}>
            <Input
              id="alias"
              {...register("alias")}
              onChange={(e) => updateField("alias", e.target.value)}
              placeholder="例: Nova"
              aria-invalid={!!errors.alias}
            />
          </FormField>

          <FormField id="world" label="Series / World" error={errors.world?.message}>
            <Input
              id="world"
              {...register("world")}
              onChange={(e) => updateField("world", e.target.value)}
              placeholder="例: Stellar Horizon"
              aria-invalid={!!errors.world}
            />
          </FormField>

          <FormField id="affiliation" label="Affiliation" error={errors.affiliation?.message}>
            <Input
              id="affiliation"
              {...register("affiliation")}
              onChange={(e) => updateField("affiliation", e.target.value)}
              placeholder="例: Celestial Corps"
              aria-invalid={!!errors.affiliation}
            />
          </FormField>

          <FormField id="rank" label="Rank / Class" error={errors.rank?.message}>
            <Input
              id="rank"
              {...register("rank")}
              onChange={(e) => updateField("rank", e.target.value)}
              placeholder="例: Captain"
              aria-invalid={!!errors.rank}
            />
          </FormField>

          <FormField id="skill" label="Ability / Skill" error={errors.skill?.message}>
            <Input
              id="skill"
              {...register("skill")}
              onChange={(e) => updateField("skill", e.target.value)}
              placeholder="例: Photon Manipulation"
              aria-invalid={!!errors.skill}
            />
          </FormField>
        </div>
      </section>

      <section aria-labelledby="dates-section-label">
        <h3 id="dates-section-label" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          日付情報（架空）
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <FormField id="birthDate" label="Birth Date" error={errors.birthDate?.message}>
            <Input
              id="birthDate"
              type="date"
              {...register("birthDate")}
              onChange={(e) => updateField("birthDate", e.target.value)}
              aria-invalid={!!errors.birthDate}
            />
          </FormField>

          <FormField id="issueDate" label="Issue Date" error={errors.issueDate?.message}>
            <Input
              id="issueDate"
              type="date"
              {...register("issueDate")}
              onChange={(e) => updateField("issueDate", e.target.value)}
              aria-invalid={!!errors.issueDate}
            />
          </FormField>

          <FormField id="expiryDate" label="Expiry Date" error={errors.expiryDate?.message}>
            <Input
              id="expiryDate"
              type="date"
              {...register("expiryDate")}
              onChange={(e) => updateField("expiryDate", e.target.value)}
              aria-invalid={!!errors.expiryDate}
            />
          </FormField>
        </div>
      </section>

      <section aria-labelledby="style-section-label">
        <h3 id="style-section-label" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          スタイル・テキスト
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormField id="cardId" label="Card ID" error={errors.cardId?.message}>
            <Input
              id="cardId"
              {...register("cardId")}
              onChange={(e) => updateField("cardId", e.target.value)}
              placeholder="例: CC-4872-NOVA"
              aria-invalid={!!errors.cardId}
            />
          </FormField>

          <FormField id="signature" label="Signature (text)" error={errors.signature?.message}>
            <Input
              id="signature"
              {...register("signature")}
              onChange={(e) => updateField("signature", e.target.value)}
              placeholder="例: H. Astraea"
              aria-invalid={!!errors.signature}
            />
          </FormField>

          <FormField id="slogan" label="Motto / Slogan" error={errors.slogan?.message} className="sm:col-span-2">
            <Input
              id="slogan"
              {...register("slogan")}
              onChange={(e) => updateField("slogan", e.target.value)}
              placeholder="例: Light guides the way."
              aria-invalid={!!errors.slogan}
            />
          </FormField>

          <FormField id="favoriteColor" label="Accent Color" error={errors.favoriteColor?.message}>
            <div className="flex gap-2 items-center">
              <input
                id="favoriteColor"
                type="color"
                {...register("favoriteColor")}
                onChange={(e) => updateField("favoriteColor", e.target.value)}
                className="h-10 w-16 rounded border border-gray-300 cursor-pointer dark:border-gray-600"
                aria-label="アクセントカラーを選択"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {watchedValues.favoriteColor}
              </span>
            </div>
          </FormField>

          <FormField id="watermarkText" label="Watermark Text" error={errors.watermarkText?.message}>
            <Input
              id="watermarkText"
              {...register("watermarkText")}
              onChange={(e) => updateField("watermarkText", e.target.value)}
              placeholder="例: FAN CARD"
              aria-invalid={!!errors.watermarkText}
            />
          </FormField>
        </div>
      </section>

      {data.imageSrc && (
        <CropDialog
          open={cropOpen}
          onClose={() => setCropOpen(false)}
          imageSrc={data.imageSrc}
          initialZoom={data.imageZoom}
          imageShape={data.imageShape}
          onApply={handleCropApply}
        />
      )}
    </div>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function FormField({ id, label, error, className, children }: FormFieldProps) {
  return (
    <div className={`space-y-1 ${className ?? ""}`}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
