import { Badge } from "@/components/ui/badge";
 
 interface CustomBadgeProps {
   children: string;
 }
 
 export function CustomBadge({ children }: CustomBadgeProps) {
   const colorVariants: Record<string, string> = {
     GET: "bg-[#DAC380] text-text ",
     POST: "bg-[#447950] text-text",
     PUT: "bg-[#F1C40F] text-text",
     DELETE: "bg-[#F57164] text-text",
     PATCH: "bg-[#9B59B6] text-text",
   };
 
   const color = colorVariants[children] || "bg-[#7f8c8d] text-text"; 
 
   return (
     <Badge className={color}>
       {children === "DELETE" ? "DEL" : children}
     </Badge>
   );
 }