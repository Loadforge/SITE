import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@/contexts";

import { Project } from "@/db/types";

import LogoDefault from "../../assets/Logo.svg";
import LogoBlack from "../../assets/Logo_black.svg";

import { BugButton } from "../bugButton";
import { HelpButton } from "../help";

interface Props {
  project: Partial<Project>;
}

export function ProjectHeader({ project }: Props) {
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const Logo = theme === "light" ? LogoBlack : LogoDefault;

  useEffect(() => {
    if (project.icon && typeof project.icon === "string" && project.icon in FaIcons) {
      setIconComponent(() => FaIcons[project.icon as keyof typeof FaIcons]);
    }
  }, [project.icon]);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <header className="bg-background-secondary border-b border-separators/25 text-text flex items-center h-14 justify-between top-0 left-0 w-full px-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handleBackToHome}
          className="text-xl bg-transparent border border-separators/50 hover:bg-separators/10 p-2 rounded-md transition"
        >
          <IoIosArrowBack className="text-text" />
        </button>
        <span className="text-2xl text-text">
          {IconComponent ? React.createElement(IconComponent) : null}
        </span>
        <span className="text-lg font-bold">{project.title}</span>
      </div>
      <div className="flex gap-10">
        <BugButton />
        <HelpButton />
        <img
          src={Logo}
          alt="Logo"
          className="max-h-full max-w-[70px] object-contain"
        />
      </div>
    </header>
  );
}
