import { FaCrown, FaCircle } from "react-icons/fa";

import { Badge } from "../ui/badge";

interface StatusBadgeProps {
  mode: "basic" | "full";
}

export function StatusBadge({ mode }: StatusBadgeProps) {
  return (
    <Badge
      variant={mode === "full" ? "default" : "basic"}
      className="flex items-center w-[4.5rem] gap-2  text-sm font-bold "
    >
      {mode === "full" ? (
        <>
          <FaCrown className="text-yellow-400" />
          Full
        </>
      ) : (
        <>
          <FaCircle className="text-text text-xs" />
          Basic
        </>
      )}
    </Badge>
  );
}
