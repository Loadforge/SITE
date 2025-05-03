import { Badge } from "@/components/ui/badge";

interface Props {
  code: number;
  status: string;
}

export function HttpStatuBadge({ code, status }: Props) {
  let badgeColor = "";

  if (code >= 200 && code < 300) {
    badgeColor = "#447950";
  } else if (code >= 400 && code < 500) {
    badgeColor = "#F1C40F";
  } else if (code >= 500) {
    badgeColor = "#F57164";
  } else {
    badgeColor = "#6c757d";
  }

  return (
    <Badge className={`bg-[${badgeColor}]  font-bold text-white  rounded`}>
      {code} - {status.toLocaleUpperCase()}
    </Badge>
  );
}
