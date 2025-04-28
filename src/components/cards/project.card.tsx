import { MoreVertical } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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
}: Props) {
  const navigate = useNavigate();
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
      navigate("/project", { state: { id, title, icon, index } });
    }
  };

  const stopPropagation = (e: React.MouseEvent<SVGElement>) => {
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

  return (
    <Card
      onClick={handleNavigate}
      className="relative select-none w-38 h-50 p-3 text-white rounded-xl shadow-md flex flex-col items-center justify-between overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
    >
      <div className="w-full flex justify-between text-text">
        <LuGrip
          size={16}
          onClick={(e) => (e as React.MouseEvent<SVGElement>).stopPropagation()}
          className="cursor-grab hover:text-primary/80 transition-colors duration-200 ease-in-out"
          {...listeners}
          {...attributes}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical
              size={16}
              onClick={stopPropagation}
              className="cursor-pointer hover:text-primary/80 transition-colors duration-200 ease-in-out"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="z-10">
            <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onClick(id);
              }}
            >
              Excluir
            </DropdownMenuItem>
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuItem>Exportar</DropdownMenuItem>
            <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsRenaming(true);
              }}
            >
              Renomear
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
