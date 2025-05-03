import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import CodeMirror from "@uiw/react-codemirror";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/contexts";

interface Props {
  responseBody: any;
}

export function BodyResponseTab({ responseBody }: Props) {
  const [content, setContent] = useState<string>("");
  const [format, setFormat] = useState<"json" | "xml">("json");

  const { resolvedTheme } = useTheme();

  const parser = new XMLParser();
  const builder = new XMLBuilder({
    format: true,
    indentBy: "  ",
    ignoreAttributes: false,
  });

  useEffect(() => {
    if (typeof responseBody === "object") {
      setContent(JSON.stringify(responseBody, null, 2));
      setFormat("json");
    } else if (typeof responseBody === "string") {
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseBody, "application/xml");
        const xmlStr = new XMLSerializer().serializeToString(xmlDoc);
        setContent(xmlStr);
        setFormat("xml");
      } catch (err) {
        setContent("Erro ao processar o conteúdo XML.");
        console.error("Erro ao processar XML:", err);
      }
    } else {
      setContent("Conteúdo inválido.");
    }
  }, [responseBody]);

  const handleFormatChange = (newFormat: "json" | "xml") => {
    try {
      let converted = content;

      if (format === "json" && newFormat === "xml") {
        const obj = JSON.parse(content);
        converted = builder.build({ root: obj }) || "<root></root>";
      } else if (format === "xml" && newFormat === "json") {
        const obj = parser.parse(content);
        const data = typeof obj.root === "string" ? {} : obj.root;
        converted = JSON.stringify(data, null, 2) || "{}";
      }

      setFormat(newFormat);
      setContent(converted);
    } catch (err) {
      console.error("Erro na conversão:", err);
    }
  };

  return (
    <div className="h-full ">
      <div className="absolute top-17 right-10 z-10 opacity-50 hover:opacity-100 transition-opacity duration-500">
        <Select
          value={format}
          onValueChange={(value: string) =>
            handleFormatChange(value as "json" | "xml")
          }
        >
          <SelectTrigger className="w-24 border border-separators/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="xml">XML</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div >
        <CodeMirror
          value={content}
          height="45dvh"
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          extensions={[format === "json" ? json() : xml()]}
          readOnly={true}
          className="text-separators rounded-xl text-[16px] overflow-hidden border"
        />
      </div>
    </div>
  );
}
