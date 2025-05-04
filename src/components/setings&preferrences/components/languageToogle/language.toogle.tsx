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

  const handleLanguageChange = (value: string) => {
    const langCode = value === "English" ? "en" : "pt";
    i18n.changeLanguage(langCode);
    setLang(value);
    localStorage.setItem("appLanguage", langCode); 
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("appLanguage");
    if (storedLang) {
      i18n.changeLanguage(storedLang);
      setLang(storedLang === "en" ? "English" : "Portuguese");
    } else {
      setLang(i18n.language === "en" ? "English" : "Portuguese");
    }
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
          <SelectItem value="Portuguese">Português(BR)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
