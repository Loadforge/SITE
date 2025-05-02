import { useRef } from "react";
import { FiUpload } from "react-icons/fi";

import { Card } from "@/components/ui/card";

interface Props {
  handleImport: (file: File) => void;
}

export function ImportProjectButton({ handleImport }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImport(file); 
    }
  };

  return (
    <>
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Card
        onClick={handleClick}
        className="w-38 h-50 border-dashed bg-separators/10 border-separators select-none rounded-xl hover:opacity-80 transition-colors flex flex-col items-center justify-center text-text shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
      >
        <FiUpload size={38} className="mb-4" />
        <span className="text-lg font-semibold">Import Project</span>
        <span className="text-xs text-text/50 mt-1">(JSON)</span>
      </Card>
    </>
  );
}
