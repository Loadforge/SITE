import { FaBook } from "react-icons/fa";
import { Button } from "../ui/button";

export function DocsButton() {
  return (
    <Button variant="homeButton" className="flex items-center gap-2">
      <FaBook  className="text-xl" />
      <span className="font-bold text-md">Docs</span>
    </Button>
  );
}
