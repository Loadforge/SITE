import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GripVertical, MoreVertical } from "lucide-react";
import React from "react";

interface ProjectCardProps {
  nome: string;
  icone: React.ReactNode;
}

export function ProjectCard({ nome, icone }: ProjectCardProps) {
  return (
    <Card className="relative w-48 h-64 p-6 text-white rounded-xl shadow-md flex flex-col items-center justify-between overflow-hidden">
      <div className="absolute top-2 left-2 text-gray-400">
        <GripVertical size={16} />
      </div>
      <div className="absolute top-2 right-2 text-gray-400">
        <MoreVertical size={16} />
      </div>

      <CardContent className="flex flex-col flex-grow items-center justify-center pt-6">
        <div className="text-8xl ">{icone}</div>
      </CardContent>
      <CardFooter>
        {" "}
        <span className="text-lg font-semibold text-center">{nome}</span>
      </CardFooter>
    </Card>
  );
}
