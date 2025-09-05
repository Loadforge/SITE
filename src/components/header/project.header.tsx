import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import * as FaIcons from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@/contexts";
import { Project } from "@/db/types";

import { connectionStorage } from "@/storages/connectionStorage";

import LogoDefault from "../../assets/Logo.svg";
import LogoBlack from "../../assets/Logo_black.svg";

import { BugButton } from "../bugButton";
import { HelpButton } from "../help";
import { ConnectionBadge } from "../statusbadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";

interface Props {
  project: Project;
  handleProjectRename: (id: string, newTitle: string) => void;
  handleProjectIconChange: (id: string, newIcon: string) => void;
}

export function ProjectHeader({
  project,
  handleProjectRename,
  handleProjectIconChange,
}: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const Logo = theme === "light" ? LogoBlack : LogoDefault;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(project.title);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(null);
  const [hasCredentials, setHasCredentials] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (project.icon && typeof project.icon === "string" && project.icon in FaIcons) {
      setIconComponent(() => FaIcons[project.icon as keyof typeof FaIcons]);
    }
  }, [project.icon]);

  useEffect(() => {
    setHasCredentials(connectionStorage.has());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBackToHome = () => navigate("/");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleProjectRename(project.id, newTitle);
      setIsEditing(false);
    }
  };

  const handleTitleClick = () => setIsEditing(true);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleIconChange = (iconName: string) => {
    handleProjectIconChange(project.id, iconName);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-background-secondary border-b border-separators/25 text-text flex items-center h-14 justify-between top-0 left-0 w-full px-4">
      <div className="flex items-center gap-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleBackToHome}
                className="text-xl bg-transparent border border-separators/50 hover:bg-separators/10 p-2 rounded-md transition"
              >
                <IoIosArrowBack className="text-text" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("backToHome")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {IconComponent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-4xl text-text cursor-pointer" onClick={toggleDropdown}>
                  {React.createElement(IconComponent)}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("clickToChangeIcon")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="text-2xl font-bold cursor-pointer"
                onClick={handleTitleClick}
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={handleTitleChange}
                    onKeyDown={handleKeyPress}
                    autoFocus
                    className="border-b-2 border-text bg-transparent focus:outline-none"
                  />
                ) : (
                  project.title
                )}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("clickToEditTitle")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="fixed bg-background top-10 left-20 border border-separators/25 p-2 mt-2 rounded-md shadow-lg z-20 w-56"
          >
            <div className="grid grid-cols-4 gap-3 max-h-60 overflow-y-auto">
              {Object.keys(FaIcons).map((iconKey) => (
                <button
                  key={iconKey}
                  onClick={() => handleIconChange(iconKey)}
                  className="text-2xl text-text/80 hover:text-text/50"
                >
                  {React.createElement(FaIcons[iconKey as keyof typeof FaIcons])}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-10">
        {hasCredentials && <ConnectionBadge />}
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
