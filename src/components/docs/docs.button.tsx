import { useTranslation } from "react-i18next";
import { FaBook } from "react-icons/fa";

import { ExternalLinkService } from "@/services";

import { Button } from "../ui/button";

export function DocsButton() {
  const { t } = useTranslation();

  const handleClick = () => {
    ExternalLinkService.openDocs();
  };

  return (
    <Button
      variant="homeButton"
      className="flex items-center gap-2"
      onClick={handleClick}
    >
      <FaBook className="text-xl" />
      <span className="font-bold text-md">{t("Docs")}</span>
    </Button>
  );
}
