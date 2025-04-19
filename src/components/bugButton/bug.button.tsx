import { Bug } from "lucide-react";


import { ExternalLinkService } from "@/services";

import { Button } from "../ui/button";


export function BugButton() {
  const handleClick = () => {
    ExternalLinkService.reportBug();
  };

  return (
    <Button
      variant="homeButton"
      className="flex items-center gap-2"
      onClick={handleClick}
    >
      <Bug className="text-xl" />
      <span className="font-bold text-md">Report a Bug</span>
    </Button>
  );
}
