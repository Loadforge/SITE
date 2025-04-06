import { GrConfigure } from "react-icons/gr";
import { Button } from "../ui/button";
import { useState } from "react";
import { SettingsPreferencesModal } from "./setings.preferences.modal";

export function SettingsPreferencesButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={toggleModal}
      >
        <GrConfigure className="text-2xl" />
        <span className="font-bold text-xl">Settings & Preferences</span>
      </Button>

      <SettingsPreferencesModal onClose={toggleModal} isOpen={isOpen} />
    </>
  );
}
