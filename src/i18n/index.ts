import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const savedLang = localStorage.getItem("appLanguage");

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: savedLang || "en", 
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
