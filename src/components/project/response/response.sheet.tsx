import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
    if (response) {
      setIsOpen(true);
    }
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
          <div className=" overflow-auto max-h-[calc(60dvh-2rem)]">
            {response ? (
              <Tabs defaultValue="body" className="w-full">
                <TabsList>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="body">Body</TabsTrigger>
                </TabsList>

                <TabsContent value="body">Body</TabsContent>
                <TabsContent value="headers">Headers</TabsContent>
              </Tabs>
            ) : (
              <NotResponse />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
