import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { HttpStatuBadge } from "@/components/badge/http.badge";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { NotResponse } from "./not.response";
import { BodyResponseTab } from "./tabs/body.response.tab";
import { HeadersResponseTab } from "./tabs/headers.response.tab";

interface Props {
  response: any;
}

export function ResponseSheet({ response }: Props) {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useSidebar();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (response != undefined) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [response]);

  const convertBytesToKB = (bytes: number) => {
    return (bytes / 1024).toFixed(2); 
  };

  return (
    <div className="relative">
      <div
        ref={panelRef}
        className="fixed bottom-0 right-0 bg-background-secondary  transition-all duration-200 shadow-lg border-t border-border"
        style={{
          height: isOpen ? "60dvh" : "5dvh",
          left: open ? "16rem" : "0",
          zIndex: isOpen ? "10" : "0",
        }}
      >
        <button
          onClick={togglePanel}
          className="p-2 bg-transparent text-text rounded absolute top-[-25px] z-20 flex items-center justify-center gap-2"
        >
          <span className="ml-2 text-xs">{t("response")}</span>
          {isOpen ? <IoIosArrowDown size={14} /> : <IoIosArrowUp size={14} />}
        </button>

        <div className="h-0.5 bg-separators/25" />

        {isOpen && (
          <div className="h-full overflow-y-auto ">
            {response ? (
              <>
                <Tabs defaultValue="body" className="w-full">
                  <TabsList>
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <TabsTrigger value="body">{t("body")}</TabsTrigger>
                        <TabsTrigger value="headers">
                          {t("headers")}
                        </TabsTrigger>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-separators">
                        <HttpStatuBadge
                          code={response.status}
                          status={response.statusText}
                        />
                        <span className="mx-2 text-2xl text-separators">•</span>
                        <span className="text-text font-bold mr-4">
                          {Math.round(response.duration)}ms
                        </span>
                        <span className="mx-2 text-2xl text-separators">•</span>
                        <span className="text-text font-bold mr-4">
                          {convertBytesToKB(response.dataSize)} KB
                        </span>
                      </div>
                    </div>
                  </TabsList>
                  <div className="px-4">
                    <TabsContent value="body">
                      <BodyResponseTab responseBody={response.data} />
                    </TabsContent>
                    <TabsContent value="headers">
                      <HeadersResponseTab responseHeaders={response.headers} />
                    </TabsContent>
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
