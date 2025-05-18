import { MoreVertical } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as FaIcons from "react-icons/fa";
import { LuGrip } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Project } from "@/db/types";

type Props = Project & {
  onClick: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onDuplicate: (id: string) => void;
  onExport: (id: string) => void;
  listeners?: React.SVGAttributes<SVGElement>;
  attributes?: React.SVGAttributes<SVGElement>;
};

export function ProjectCard({
  id,
  title,
  icon,
  index,
  listeners,
  attributes,
  onClick,
  onRename,
  onDuplicate,
  onExport,
}: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(
    null
  );
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (icon && typeof icon === "string" && icon in FaIcons) {
      setIconComponent(() => FaIcons[icon as keyof typeof FaIcons]);
    }
  }, [icon]);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleNavigate = () => {
    if (!isRenaming) {
      navigate(`/project/${id}`, { state: { index } });
    }
  };

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onRename(id, newTitle.trim() || title);
      setIsRenaming(false);
    } else if (e.key === "Escape") {
      setNewTitle(title);
      setIsRenaming(false);
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDuplicate(id);
  };

  const handleExport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onExport(id);
  };

  return (
    <Card
      onClick={handleNavigate}
      className="relative select-none w-38 h-50 p-3 text-white rounded-xl shadow-md flex flex-col items-center justify-between overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
    >
      <div className="w-full flex justify-between text-text">
        <LuGrip
          size={16}
          onClick={handleStopPropagation}
          className="cursor-grab hover:text-primary/80 transition-colors duration-200 ease-in-out"
          {...listeners}
          {...attributes}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical
              size={16}
              onClick={handleStopPropagation}
              className="cursor-pointer hover:text-primary/80 transition-colors duration-200 ease-in-out"
              aria-label={t("More_Actions")}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="z-10">
            <DropdownMenuItem onClick={handleDuplicate}>
              {t("Duplicate")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExport}>
              {t("Export")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsRenaming(true);
              }}
            >
              {t("Rename")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick(id);
              }}
            >
              {t("Delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardContent className="text-text">
        <div className="text-4xl">
          {IconComponent ? React.createElement(IconComponent) : null}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center w-full">
        {isRenaming ? (
          <input
            ref={inputRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            className="text-text text-md font-semibold bg-transparent border-b border-primary focus:outline-none text-center w-full"
          />
        ) : (
          <span className="text-text text-md font-semibold text-center">
            {title}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
