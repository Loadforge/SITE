import { useRef, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { useSidebar } from "@/components/ui/sidebar";

import { NotResponse } from "./not.response";

type ResponseEntity = {
  message: string;
  timestamp: string;
};

interface ResponseSheetProps {
  response?: ResponseEntity;
}

export function ResponseSheet({ response }: ResponseSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(30);
  const { open } = useSidebar();

  const togglePanel = () => {
    setHeight(height === 30 ? 300 : 30);
  };

  return (
    <div className="relative">
      <div
        ref={panelRef}
        className="fixed bottom-0 right-0 bg-background-secondary z-10 transition-all duration-200"
        style={{
          height,
          left: open ? "16rem" : "0",
        }}
      >
        <button
          onClick={togglePanel}
          className="p-2 bg-transparent text-text rounded absolute top-[-25px] z-20 flex items-center justify-center gap-2"
        >
          <span className="ml-2 text-xs">Response</span>
          {height === 30 ? (
            <IoIosArrowDown size={14} />
          ) : (
            <IoIosArrowUp size={14} />
          )}
        </button>

        <div className="h-0.5 cursor-ns-resize bg-separators hover:bg-primary/50" />
        {height > 30 && (
          <div className="p-4">{response ? <></> : <NotResponse />}</div>
        )}
      </div>
    </div>
  );
}
