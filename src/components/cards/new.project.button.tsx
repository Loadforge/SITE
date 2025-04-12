import { FaPlus } from "react-icons/fa";

import { Card } from "@/components/ui/card";

interface NewProjectButtonProps {
  onClick?: () => void;
}

export function NewProjectButton({ onClick }: NewProjectButtonProps) {
  return (
    <Card
      onClick={onClick}
      className="w-38 h-50 bg-primary select-none rounded-xl border border-dashed border-gray-300 hover:border-white hover:opacity-80 transition-colors flex flex-col items-center justify-center text-white shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <FaPlus size={38} className="mb-4" />
      <span className="text-lg font-semibold">New project</span>
    </Card>
  );
}
