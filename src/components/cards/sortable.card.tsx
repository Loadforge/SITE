import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Project } from "@/db/types";

import { ProjectCard } from "./project.card";

type Props = Project & {
  onClick: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onDuplicate: (id: string) => void;
  onExport: (id: string) => void;
};

export function SortableCard({ onClick, onRename, onDuplicate, onExport, ...props }: Props) {
  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({
      id: props.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ProjectCard
        {...props}
        attributes={attributes}
        listeners={listeners}
        onClick={onClick}
        onRename={onRename}
        onDuplicate={onDuplicate}
        onExport={onExport}
      />
    </div>
  );
}
