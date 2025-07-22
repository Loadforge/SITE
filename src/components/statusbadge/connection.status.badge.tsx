import { useTranslation } from "react-i18next";
import { FaCircle } from "react-icons/fa";

import { useWebSocketStore } from "@/contexts/socket/websocketStore";

import { Badge } from "../ui/badge";

export function ConnectionBadge() {
  const { t } = useTranslation();
  const { isConnected } = useWebSocketStore();

  const colorClass = isConnected ? "text-green-500" : "text-red-500";
  const statusLabel = isConnected ? t("connected") : t("disconnected");

  return (
    <Badge
      variant="outline"
      className="flex items-center gap-2 text-sm font-semibold"
    >
      <FaCircle className={`${colorClass} text-xs`} />
      {statusLabel}
    </Badge>
  );
}
