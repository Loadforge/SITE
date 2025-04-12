import { useState } from "react";
import { GrConfigure } from "react-icons/gr";

import { Button } from "../ui/button";

import { SettingsPreferencesModal } from "./setings.preferences.modal";

export function SettingsPreferencesButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Button
        variant="homeButton"
        className="flex items-center gap-2"
        onClick={toggleModal}
      >
        <GrConfigure className="text-xl" />
        <span className="font-bold text-md">Settings & Preferences</span>
      </Button>

      <SettingsPreferencesModal onClose={toggleModal} isOpen={isOpen} />
    </>
  );
}
