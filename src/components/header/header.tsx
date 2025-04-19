import { useTheme } from "@/contexts";

import LogoDefault from "../../assets/Logo.svg";
import LogoBlack from "../../assets/Logo_black.svg";

import { BugButton } from "../bugButton";
import { DocsButton } from "../docs";
import { SettingsPreferencesButton } from "../setings&preferrences";
import { StatusBadge } from "../statusbadge";

export function Header() {
  const { theme } = useTheme();
  const Logo = theme === "light" ? LogoBlack : LogoDefault;


  return (
    <header className="bg-background-secondary border-b border-separators/25 text-text flex items-center lg:px-15 xl:px-30 h-14 justify-between top-0 left-0 w-full">
      <div className="flex items-end">
        <img
          src={Logo}
          alt="Logo"
          className="max-h-full max-w-[70px] object-contain"
        />
      </div>
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <BugButton/>
        <SettingsPreferencesButton />
        <DocsButton />
        <StatusBadge mode="basic" />
      </div>
    </header>
  );
}
