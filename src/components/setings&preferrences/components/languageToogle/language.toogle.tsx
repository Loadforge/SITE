import { useTranslation } from "react-i18next";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function LanguageToggle() {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;

  const handleLanguageChange = (value: string) => {
    const langCode = value === "English" ? "en" : "pt";
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="flex items-center gap-2 text-lg text-text font-bold">
      <span>{t("Language")}:</span>
      <Select
        value={currentLang === "en" ? "English" : "Portuguese"}
        onValueChange={handleLanguageChange}
      >
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
