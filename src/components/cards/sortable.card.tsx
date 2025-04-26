import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ProjectCardEntity } from "@/@entities";

import { ProjectCard } from "./project.card";

type Props = ProjectCardEntity & {
  onClick: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
};

export function SortableCard({ onClick, onRename, ...props }: Props) {
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
      />
    </div>
  );
}
