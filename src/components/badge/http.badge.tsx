import { Badge } from "@/components/ui/badge";

interface Props {
  code: number;
  status: string;
}

export function HttpStatuBadge({ code, status }: Props) {
  let color = "";

  if (code >= 100 && code < 200) {
    color = "#3498db";
  } else if (code >= 200 && code < 300) {
    color = "#2ecc71";
  } else if (code >= 300 && code < 400) {
    color = "#9b59b6";
  } else if (code >= 400 && code < 500) {
    color = "#f1c40f";
  } else if (code >= 500) {
    color = "#e74c3c";
  } else {
    color = "#6c757d";
  }

  return (
    <Badge
      className="font-bold rounded  text-sm"
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}`,
      }}
    >
      {code} {status.toUpperCase()}
    </Badge>
  );
}
