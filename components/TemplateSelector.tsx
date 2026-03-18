"use client";

import { TemplateId } from "@/types/card";
import { cn } from "@/lib/utils";
import { Zap, Users, Plane, ScrollText, Monitor, Sparkles, Layers } from "lucide-react";

const TEMPLATE_GROUPS: {
  label: string;
  items: { id: TemplateId; label: string; description: string; icon: React.ReactNode; accent: string }[];
}[] = [
  {
    label: "フィクション",
    items: [
      {
        id: "neon-license",
        label: "Neon License",
        description: "サイバーパンク・ネオン",
        icon: <Zap className="h-4 w-4" aria-hidden="true" />,
        accent: "from-indigo-500 to-purple-600",
      },
      {
        id: "civic-profile",
        label: "Civic Profile",
        description: "クリーン・フォーマル",
        icon: <Users className="h-4 w-4" aria-hidden="true" />,
        accent: "from-teal-500 to-emerald-600",
      },
      {
        id: "travel-pass",
        label: "Travel Archive Pass",
        description: "ヴィンテージ旅行者",
        icon: <Plane className="h-4 w-4" aria-hidden="true" />,
        accent: "from-amber-500 to-orange-600",
      },
      {
        id: "jp-formal",
        label: "和様証明書",
        description: "架空・和風フォーマル",
        icon: <ScrollText className="h-4 w-4" aria-hidden="true" />,
        accent: "from-rose-700 to-red-900",
      },
    ],
  },
  {
    label: "Windows 風",
    items: [
      {
        id: "win95",
        label: "Win 95 / 98",
        description: "クラシック グレー",
        icon: <Monitor className="h-4 w-4" aria-hidden="true" />,
        accent: "from-gray-500 to-gray-700",
      },
      {
        id: "winxp",
        label: "Win XP",
        description: "Luna ブルー",
        icon: <Layers className="h-4 w-4" aria-hidden="true" />,
        accent: "from-blue-500 to-blue-700",
      },
      {
        id: "win-aero",
        label: "Win 7 Aero",
        description: "ガラス・エアロ",
        icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
        accent: "from-sky-400 to-blue-600",
      },
    ],
  },
];

interface TemplateSelectorProps {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
}

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">
        テンプレート
      </legend>
      {TEMPLATE_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="mb-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            {group.label}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {group.items.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={value === t.id}
                onClick={() => onChange(t.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg border-2 p-2.5 text-center transition-all text-sm cursor-pointer",
                  value === t.id
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
                )}
              >
                <div className={cn("rounded-md bg-gradient-to-br p-2 text-white", t.accent)}>
                  {t.icon}
                </div>
                <span className="font-medium text-gray-900 dark:text-gray-100 leading-tight text-xs">
                  {t.label}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                  {t.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </fieldset>
  );
}
