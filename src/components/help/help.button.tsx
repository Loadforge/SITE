import { useTranslation } from "react-i18next"; 
import { IoIosHelpCircle } from "react-icons/io";

import { Button } from "../ui/button";

export function HelpButton() {
  const { t } = useTranslation(); 

  return (
    <Button
      variant="homeButton"
      className="flex items-center gap-1"
    >
      <IoIosHelpCircle className="text-xl" />
      <span className="font-bold text-md">{t('help')}</span> 
    </Button>
  );
}
