import { Laptop, Moon, Sun } from "lucide-react";

import { useTheme } from "@/contexts";



export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      value: "light",
      label: "Light",
      icon: <Sun size={34} />,
    },
    {
      value: "dark",
      label: "Dark",
      icon: <Moon size={34} />,
    },
    {
      value: "system",
      label: "System",
      icon: <Laptop size={34} />,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold mb-4 text-text">Appearance</h2>
      <div className="flex justify-center gap-10">
        {options.map(({ value, label, icon }) => {
          const isSelected = theme === value;

          return (
            <button
              key={value}
              className={`flex flex-col items-center justify-between
                          w-34 h-38 rounded-md border-2 px-2 py-3
                          transition-colors
                          ${
                            isSelected
                              ? "border-primary "
                              : "border-separators/50  hover:border-background"
                          }
                        `}
              onClick={() => setTheme(value)}
            >
              <div className="flex items-center justify-center">{icon}</div>
              <span className="text-md font-semibold text-text">{label}</span>
              <div className="mt-1">
                {isSelected ? (
                  <div className="w-2 h-2 bg-primary rounded-full mx-auto" />
                ) : (
                  <div className="w-2 h-2 bg-transparent rounded-full mx-auto border border-transparent" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
