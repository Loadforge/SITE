import { IoIosHelpCircle } from "react-icons/io";

import { Button } from "../ui/button";


export function HelpButton() {

  return (
    <>
      <Button
        variant="help"
        className="flex items-center gap-1"
      >
        <IoIosHelpCircle className="text-xl" />
        <span className="font-bold text-md">Help</span>
      </Button>

    </>
  );
}
