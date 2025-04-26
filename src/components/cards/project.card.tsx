import { MoreVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { LuGrip } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { ProjectCardEntity } from "@/@entities";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Props = ProjectCardEntity & {
  onClick: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  listeners?: React.SVGAttributes<SVGElement>;
  attributes?: React.SVGAttributes<SVGElement>;
};

export function ProjectCard({
  id,
  title,
  icon,
  listeners,
  attributes,
  onClick,
  onRename,
}: Props) {
  const navigate = useNavigate();
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(null);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    if (icon && typeof icon === "string" && icon in FaIcons) {
      setIconComponent(() => FaIcons[icon as keyof typeof FaIcons]);
    }
  }, [icon]);

  const handleNavigate = () => {
    navigate("/project", { state: { id, title, icon } });
  };

  const stopPropagation = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onRename(id, newTitle);
      setIsRenameOpen(false);
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
                setIsRenameOpen(true);
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

      <CardFooter>
        <span className="text-text text-md font-semibold text-center">
          {title}
        </span>
      </CardFooter>

      {isRenameOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/60  flex items-center justify-center "
          onClick={() => setIsRenameOpen(false)}
        >
          <div
            className="bg-background rounded-xl p-4 w-64 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 rounded-md border border-border text-sm bg-muted text-text mb-3"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 text-sm bg-muted text-text rounded-md hover:bg-muted/80"
                onClick={() => setIsRenameOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
                onClick={() => {
                  onRename(id, newTitle);
                  setIsRenameOpen(false);
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
