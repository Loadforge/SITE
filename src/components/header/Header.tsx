import Logo from "../../../public/Logo.svg";
import { DocsButton } from "../docs";
import { SettingsPreferencesButton } from "../setings&preferrences";
import { StatusBadge } from "../statusbadge";

export function Header() {
  return (
    <header className="bg-background-secondary border-b text-text flex items-center   lg:px-25 xl:px-50 h-16 justify-between top-0 left-0 w-full">
      <div className="flex items-end">
      <img
        src={Logo}
        alt="Logo"
        className="max-h-full max-w-[90px] object-contain"
      />
      </div>
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
      <SettingsPreferencesButton />
      <DocsButton/>
      <StatusBadge mode="basic"/>
      </div>
    </header>
  );
}
