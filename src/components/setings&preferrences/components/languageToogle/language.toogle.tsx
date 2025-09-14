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

  // Use short language codes to match our i18n config and folder structure
  const languageLabels: Record<string, string> = {
    en: "English",
    pt: "Português(BR)",
  };

  const normalizeLang = (lng: string) => (lng?.toLowerCase().startsWith("pt") ? "pt" : "en");

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

    const matchedShort = normalizeLang(storedLang || browserLang);

    i18n.changeLanguage(matchedShort);
    setLang(languageLabels[matchedShort]);
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
