import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaCircle } from "react-icons/fa";

import { useWebSocketStore } from "@/contexts/socket/websocketStore";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function ConnectionBadge() {
  const { t } = useTranslation();
  const { isConnected, reconnect } = useWebSocketStore();

  const colorClass = isConnected ? "text-green-500" : "text-red-500";
  const statusLabel = isConnected ? t("connected") : t("disconnected");

  return (
    <Badge
      variant="outline"
      className="flex items-center gap-2 text-sm font-semibold"
    >
      <FaCircle className={`${colorClass} text-xs`} />
      {statusLabel}

      {!isConnected && (
        <Button
          size="icon"
          variant="ghost"
          className="ml-2 h-5 w-5 p-0"
          onClick={reconnect}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </Badge>
  );
}
