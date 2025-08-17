import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useSidebar } from "@/components/ui/sidebar";

import { DataTable } from "./table/data-table";

interface Props {
  response: any;
}

export function ResponseChargeSheet({ response }: Props) {
  const test = true;
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useSidebar();

  const columns = [
    { accessorKey: "duration", header: "Duration" },
    { accessorKey: "status", header: "Status" },
  ];

  const mockData = [
    { duration: 131, status: "200" },
    { duration: 312, status: "200" },
    { duration: 25, status: "500" },
    { duration: 64, status: "200" },
  ];

  const togglePanel = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(response !== undefined);
  }, [response]);

  return (
    <div className="relative">
      <div
        ref={panelRef}
        className="fixed bottom-0 right-0 bg-background-secondary transition-all duration-200 shadow-lg border-t border-border"
        style={{
          height: isOpen ? "60dvh" : "5dvh",
          left: open ? "16rem" : "0",
          zIndex: isOpen ? "10" : "0",
        }}
      >
        <button
          onClick={togglePanel}
          className="p-2 bg-transparent text-text absolute top-[-25px] right-0 mr-2 z-20 flex items-end justify-end gap-2"
        >
          <span className="ml-2 text-xs">Charge Test</span>
          {isOpen ? <IoIosArrowDown size={14} /> : <IoIosArrowUp size={14} />}
        </button>

        <div className="h-0.5 bg-separators/25" />

        {isOpen && (
          <div className="h-full overflow-y-auto">
            <div className="flex justify-between items-center w-full p-4">
              Aqui vai outra coisa
            </div>

            <div className="p-2">{test && <DataTable columns={columns} data={mockData} />}</div>
          </div>
        )}
      </div>
    </div>
  );
}
