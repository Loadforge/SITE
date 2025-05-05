import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageToggle() {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState<string>("");

  const languageLabels: Record<string, string> = {
    "en-US": "English",
    "pt-BR": "Português(BR)",
  };

  const handleLanguageChange = (label: string) => {
    const selectedCode = Object.entries(languageLabels).find(
      ([, value]) => value === label
    )?.[0];

    if (selectedCode) {
      i18n.changeLanguage(selectedCode);
      localStorage.setItem("appLanguage", selectedCode);
      setLang(label);
    }
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("appLanguage");
    const browserLang = navigator.language;

    const initialLang = storedLang || browserLang;
    const matchedLang =
      initialLang.startsWith("pt") ? "pt-BR" : "en-US";

    i18n.changeLanguage(matchedLang);
    setLang(languageLabels[matchedLang]);
  }, []);

  return (
    <div className="flex items-center gap-2 text-lg text-text font-bold">
      <span>{t("Language")}:</span>
      <Select value={lang} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[180px] bg-background border-none text-sm text-text p-2 rounded-md focus:outline-none">
          <SelectValue placeholder={t("Select_language")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Português(BR)">Português(BR)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
