import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { HttpStatuBadge } from "@/components/badge/http.badge";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { NotResponse } from "./not.response";

interface Props {
  response: any;
}

export function ResponseSheet({ response }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useSidebar();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(true);
  }, [response]);

  return (
    <div className="relative">
      <div
        ref={panelRef}
        className="fixed bottom-0 right-0 bg-background-secondary z-10 transition-all duration-200 shadow-lg border-t border-border"
        style={{
          height: isOpen ? "60dvh" : "5dvh",
          left: open ? "16rem" : "0",
        }}
      >
        <button
          onClick={togglePanel}
          className="p-2 bg-transparent text-text rounded absolute top-[-25px] z-20 flex items-center justify-center gap-2"
        >
          <span className="ml-2 text-xs">Response</span>
          {isOpen ? <IoIosArrowDown size={14} /> : <IoIosArrowUp size={14} />}
        </button>

        <div className="h-0.5 bg-separators/25" />

        {isOpen && (
          <div>
            {response ? (
              <>
                <Tabs defaultValue="body" className="w-full">
                  <TabsList>
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <TabsTrigger value="body">Body</TabsTrigger>
                        <TabsTrigger value="headers">Headers</TabsTrigger>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <HttpStatuBadge
                          code={response.status}
                          status={response.statusText}
                        />
                        <span className="mx-2 text-2xl text-separators">•</span>
                        <span className="text-text font-bold mr-4">
                          {Math.round(response.duration)}ms
                        </span>
                      </div>
                    </div>
                  </TabsList>
                  <div className="px-4">
                    <TabsContent value="body">Body</TabsContent>
                    <TabsContent value="headers">Headers</TabsContent>
                  </div>
                </Tabs>
              </>
            ) : (
              <NotResponse />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
