import { Badge } from "../ui/badge";
import { FaCrown, FaCircle } from "react-icons/fa";

interface StatusBadgeProps {
  mode: "basic" | "full";
}

export function StatusBadge({ mode }: StatusBadgeProps) {
  return (
    <Badge
      variant={mode === "full" ? "default" : "outline"}
      className="flex items-center w-[5rem] gap-2 px-3 py-1 text-base font-bold shadow-sm"
    >
      {mode === "full" ? (
        <>
          <FaCrown className="text-yellow-400" />
          Full
        </>
      ) : (
        <>
          <FaCircle className="text-muted-foreground text-xs" />
          Basic
        </>
      )}
    </Badge>
  );
}
