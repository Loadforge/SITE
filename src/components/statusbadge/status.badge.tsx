import { useTranslation } from "react-i18next";
import { FaCircle, FaCrown } from "react-icons/fa";

import { useWebSocketStore } from "@/contexts/socket/websocketStore";

import { Badge } from "../ui/badge";

export function StatusBadge() {
  const { t } = useTranslation();
  const {isConnected} = useWebSocketStore();

  const mode = isConnected ? "full" : "basic";

  return (
    <Badge
      variant={mode === "full" ? "default" : "basic"}
      className="flex items-center gap-2 text-sm font-bold"
    >
      {mode === "full" ? (
        <>
          <FaCrown className="text-yellow-400" />
          {t("advanced")}
        </>
      ) : (
        <>
          <FaCircle className="text-zinc-400 text-xs" />
          {t("basic")}
        </>
      )}
    </Badge>
  );
}
