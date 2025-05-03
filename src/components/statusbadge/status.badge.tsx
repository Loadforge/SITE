import { useTranslation } from "react-i18next";
import { FaCrown, FaCircle } from "react-icons/fa";

import { Badge } from "../ui/badge";

interface StatusBadgeProps {
  mode: "basic" | "full";
}

export function StatusBadge({ mode }: StatusBadgeProps) {
  const { t } = useTranslation();

  return (
    <Badge
      variant={mode === "full" ? "default" : "basic"}
      className="flex items-center  gap-2 text-sm font-bold"
    >
      {mode === "full" ? (
        <>
          <FaCrown className="text-yellow-400" />
          {t("advanced")}
        </>
      ) : (
        <>
          <FaCircle className="text-text text-xs" />
          {t("basic")}
        </>
      )}
    </Badge>
  );
}
