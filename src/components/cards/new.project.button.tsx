import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

import { Card } from "@/components/ui/card";

interface NewProjectButtonProps {
  onClick: () => void;
}

export function NewProjectButton({ onClick }: NewProjectButtonProps) {
  const { t } = useTranslation();

  return (
    <Card
      onClick={onClick}
      className="w-38 h-50 bg-primary select-none rounded-xl border hover:border-text hover:opacity-80 flex flex-col items-center justify-center text-white shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <FaPlus size={38} className="mb-4" />
      <span className="text-lg font-semibold">{t("New_Project")}</span>
    </Card>
  );
}
