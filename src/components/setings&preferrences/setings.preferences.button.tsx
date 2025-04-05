import { GrConfigure } from "react-icons/gr";
import { Button } from "../ui/button";

export function SettingsPreferencesButton() {
  return (
    <Button variant="outline" className="flex items-center gap-2">
      <GrConfigure className="text-2xl" />
      <span className="font-bold text-xl">Settings & Preferences</span>
    </Button>
  );
}
