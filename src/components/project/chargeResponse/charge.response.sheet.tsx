import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { AbortButton } from "@/components/abortButton";
import { TestTimer } from "@/components/testTimer";
import { useSidebar } from "@/components/ui/sidebar";
import { useWebSocketStore } from "@/contexts/socket/websocketStore";

import { ConfigTest } from "@/db/types/config.type";

import { NotChargeResponse } from "./not.charge.response";
import { DataTable } from "./table/data-table";

interface Props {
  response: any;
  configTest?: ConfigTest;
}

export function ResponseChargeSheet({ response, configTest }: Props) {
  const { processData, test } = useWebSocketStore();
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useSidebar();

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const columns = [
    { accessorKey: "duration_ms", header: "Duration" },
    { accessorKey: "http_status", header: "Status" },
  ];

  const togglePanel = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    setIsOpen(response !== undefined);
  }, [response]);

  useEffect(() => {
    if (test) {
      setIsOpen(true);
    }
  }, [test]);

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
          <div ref={scrollRef} className="h-full overflow-y-auto">
            {test ? (
              <>
                <div className="flex justify-between items-center w-full px-4 py-1">
                  <div className="flex items-center gap-6 text-sm font-medium text-separators">
                    <span className="text-text font-bold">Users:</span>{" "}
                    {configTest?.concurrency}
                    <span className="text-text font-bold">Duration:</span>{" "}
                    {configTest?.duration}s
                    {configTest?.hardware_info && (
                      <span className="text-text font-bold">
                        CPU: {configTest.hardware_info.cpu_cores} | RAM:{" "}
                        {configTest.hardware_info.free_ram_mb}/
                        {configTest.hardware_info.total_ram_mb} MB
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <AbortButton />
                    <TestTimer />
                  </div>
                </div>
                <div className="p-2">
                  <DataTable
                    columns={columns}
                    data={(processData ?? []).map((item: any) => ({
                      ...item,
                      status:
                        item.status !== undefined
                          ? String(item.status)
                          : undefined,
                    }))}
                  />
                </div>
              </>
            ) : (
              <NotChargeResponse />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
