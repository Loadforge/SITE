import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const supportedLanguages = ["en", "pt"];

const browserLang = navigator.language || "en";

const savedLang = localStorage.getItem("appLanguage");
const normalizeLang = (lng: string) => (lng?.toLowerCase().startsWith("pt") ? "pt" : "en");
const initialLang = normalizeLang(savedLang || browserLang);

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: initialLang,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    supportedLngs: supportedLanguages,
    load: "languageOnly",
  });

export default i18n;
