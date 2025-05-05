import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const supportedLanguages = ["en-US", "pt-BR"];

const browserLang = navigator.language || "en-US";

const savedLang = localStorage.getItem("appLanguage");
const initialLang = supportedLanguages.includes(savedLang || browserLang)
  ? (savedLang || browserLang)
  : "en-US";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: initialLang,
    fallbackLng: "en-US",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    supportedLngs: supportedLanguages,
    load: "currentOnly",
  });

export default i18n;
