import { MoreVertical } from "lucide-react";
import React from "react";
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
  listeners?: React.SVGAttributes<SVGElement>;
  attributes?: React.SVGAttributes<SVGElement>;
};

export function ProjectCard({ id, title, icon, listeners, attributes }: Props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/project", { state: { id } });
  };

  const stopPropagation = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
  };
  return (
    <Card
      onClick={handleNavigate}
      className="select-none w-38 h-50 p-3 text-white rounded-xl shadow-md flex flex-col items-center justify-between overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Excluir</DropdownMenuItem>
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuItem>Exportar</DropdownMenuItem>
            <DropdownMenuItem>Renomear</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardContent className="text-text">
        <div className="text-4xl">{React.createElement(icon)}</div>
      </CardContent>

      <CardFooter>
        <span className="text-text text-md font-semibold text-center">
          {title}
        </span>
      </CardFooter>
    </Card>
  );
}
