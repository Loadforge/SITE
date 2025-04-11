import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import React from "react";

import { IconType } from "react-icons/lib";
import { LuGrip } from "react-icons/lu";

interface ProjectCardProps {
  title: string;
  icon: IconType;
}

export function ProjectCard({ title, icon }: ProjectCardProps) {
  return (
    <Card className=" w-48 h-64 p-6 text-white rounded-xl shadow-md flex flex-col items-center justify-between overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
      <div className=" w-full flex justify-between top-2 left-2 text-text">
        <LuGrip size={16} className="cursor-grab" />
        <MoreVertical size={16} />
      </div>

      <CardContent className="flex flex-col flex-grow items-center justify-center pt-6">
        <div className="text-8xl ">{React.createElement(icon)}</div>
      </CardContent>
      <CardFooter>
        {" "}
        <span className="text-lg font-semibold text-center">{title}</span>
      </CardFooter>
    </Card>
  );
}
