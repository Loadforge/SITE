import { Bug } from "lucide-react";
import { useTranslation } from 'react-i18next';

import { ExternalLinkService } from "@/services";

import { Button } from "../ui/button";


export function BugButton() {
const { t } = useTranslation();

  const handleClick = () => {
    ExternalLinkService.reportBug();
  };

  return (
    <Button
      variant="homeButton"
      className="flex items-center gap-2"
      onClick={handleClick}
    >
      <Bug className="text-xl" />
      <span className="font-bold text-md">{t('Bug_Report')}</span>
    </Button>
  );
}
