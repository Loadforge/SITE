import { LanguageToggle, ThemeToggle } from "../components";

export function PreferencesTab() {
  return (
    <div className="flex flex-col gap-y-10 w-">
      <LanguageToggle />
      <ThemeToggle />
    </div>
  );
}
