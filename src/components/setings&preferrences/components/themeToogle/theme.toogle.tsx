import { Laptop, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Separator } from "@/components/ui";
import { useTheme } from "@/contexts";

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const options = [
    {
      value: "light",
      label: t("Light"),
      icon: <Sun size={34} />,
    },
    {
      value: "dark",
      label: t("Dark"),
      icon: <Moon size={34} />,
    },
    {
      value: "system",
      label: t("System"),
      icon: <Laptop size={34} />,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold mb-4 text-text">{t("Appearance")}</h2>
      <div className="flex justify-between gap-10 w-full">
        {options.map(({ value, label, icon }) => {
          const isSelected = theme === value;

          return (
            <button
              key={value}
              className={`flex flex-col items-center justify-between
                          w-54 h-48 rounded-md border-2 px-2 py-3
                          transition-colors
                          ${
                            isSelected
                              ? "border-primary "
                              : "border-separators/50 transition-transform  hover:border-primary/50 hover:scale-105"
                          }
                        `}
              onClick={() => setTheme(value)}
            >
              <div className="flex items-center justify-center pt-6">{icon}</div>
              <Separator className="bg-separators/50" />
              <span className="text-md font-semibold text-text pt-4">{label}</span>
              <div className="mt-1">
                {isSelected ? (
                  <div className="w-2 h-2 bg-primary rounded-full mx-auto" />
                ) : (
                  <div className="w-2 h-2 bg-none rounded-full mx-auto" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
