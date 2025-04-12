import { ProjectEntity } from "@/@entities";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LuGrip } from "react-icons/lu";

export function ProjectCard({ title, icon, id }: ProjectEntity) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/project/${id}`, { replace: false });
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      onClick={handleNavigate}
      className="w-38 h-50 p-3 text-white rounded-xl shadow-md flex flex-col items-center justify-between overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
    >
      <div className="w-full flex justify-between  text-text">
        <LuGrip size={16} className="cursor-grab" onClick={stopPropagation} />
        <MoreVertical
          size={16}
          onClick={stopPropagation}
          className="cursor-pointer"
        />
      </div>

      <CardContent className="text-text">
        <div className="text-4xl ">{React.createElement(icon)}</div>
      </CardContent>

      <CardFooter>
        <span className=" text-text text-md font-semibold text-center">
          {title}
        </span>
      </CardFooter>
    </Card>
  );
}
