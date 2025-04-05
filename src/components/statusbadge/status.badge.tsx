import { Badge } from "../ui/badge";

interface StatusBadgeProps {
  mode: "basic" | "full";
}

export function StatusBadge({ mode }: StatusBadgeProps) {
  return (
    <Badge
      variant={mode === "full" ? "default" : "outline"}
      className="flex items-center gap-2 px-3 py-1 text-base font-bold"
    >
      {mode === "full" ? "Full Access" : "Basic Access"}
    </Badge>
  );
}
