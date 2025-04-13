import { LanguageToggle, ThemeToggle } from "../components";

export function PreferencesTab() {
  return (
    <div className="flex flex-col gap-y-16 w-">
      <LanguageToggle />
      <ThemeToggle />
    </div>
  );
}
