import { Badge } from "@/components/ui/badge";

interface CustomBadgeProps {
  children: string;
}

export function CustomBadge({ children }: CustomBadgeProps) {
  const colorVariants: Record<string, string> = {
    GET: "bg-[#DAC380] text-white ",
    POST: "bg-[#447950] text-white",
    PUT: "bg-[#F1C40F] text-black",
    DELETE: "bg-[#C0765B] text-white",
    PATCH: "bg-[#9B59B6] text-white",
  };

  const color = colorVariants[children] || "bg-[#7f8c8d] text-white"; 

  return (
    <Badge className={color}>
      {children === "DELETE" ? "DEL" : children}
    </Badge>
  );
}
