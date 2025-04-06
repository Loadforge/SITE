import { FaPlus } from "react-icons/fa";
import { Card } from "@/components/ui/card";

export function NewProjectButton() {
  return (
    <Card className="w-48 h-64 bg-primary rounded-xl border border-dashed border-gray-300 hover:border-white hover:opacity-80 transition-colors flex flex-col items-center justify-center text-white shadow-md cursor-pointer">
      <FaPlus  size={48} className="mb-4" />
      <span className="text-xl font-semibold">New project</span>
    </Card>
  );
}
