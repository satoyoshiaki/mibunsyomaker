"use client";

import { TemplateId } from "@/types/card";
import { cn } from "@/lib/utils";
import { Zap, Users, Plane } from "lucide-react";

const TEMPLATES: { id: TemplateId; label: string; description: string; icon: React.ReactNode; accent: string }[] = [
  {
    id: "neon-license",
    label: "Neon License",
    description: "サイバーパンク風・ネオン配色",
    icon: <Zap className="h-4 w-4" aria-hidden="true" />,
    accent: "from-indigo-500 to-purple-600",
  },
  {
    id: "civic-profile",
    label: "Civic Profile",
    description: "クリーン・フォーマル風",
    icon: <Users className="h-4 w-4" aria-hidden="true" />,
    accent: "from-teal-500 to-emerald-600",
  },
  {
    id: "travel-pass",
    label: "Travel Archive Pass",
    description: "ヴィンテージ・旅行者風",
    icon: <Plane className="h-4 w-4" aria-hidden="true" />,
    accent: "from-amber-500 to-orange-600",
  },
];

interface TemplateSelectorProps {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
}

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        テンプレート
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={value === t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border-2 p-3 text-center transition-all text-sm cursor-pointer",
              value === t.id
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
            )}
          >
            <div
              className={cn(
                "rounded-md bg-gradient-to-br p-2 text-white",
                t.accent
              )}
            >
              {t.icon}
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">{t.label}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{t.description}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
