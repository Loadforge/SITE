import { useTranslation } from "react-i18next";

import Logo from "../../../assets/Logo_black.svg";


export function InDevelopment() {
  const { t } = useTranslation(); 

  return (
    <div className=" flex flex-col items-center justify-center h-full text-center p-4">
      <img
        src={Logo}
        alt="Logo da aplicação [Nome da aplicação]"
        className="w-24 h-24 mb-6 sm:w-32 sm:h-32" 
      />
      <h1 className="text-2xl font-bold text-text mb-2">
        {t("Feature_under_development")} 
      </h1>
      <p className="text-text">
        {t("Feature_in_progress")} 
      </p>
    </div>
  );
}
