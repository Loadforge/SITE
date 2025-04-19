import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import CodeMirror from "@uiw/react-codemirror";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/contexts";

export function BodyReq() {

  const [format, setFormat] = useState<"json" | "xml">("json");
  const [content, setContent] = useState<string>("{}");
  const [error, setError] = useState<string | null>(null);
  const {resolvedTheme} = useTheme();

  const parser = new XMLParser();
  const builder = new XMLBuilder({
    format: true,
    indentBy: "  ",
    ignoreAttributes: false,
  });

  const handleContentChange = (value: string) => {
    setContent(value);
    setError(null);
  };

  const handleFormatChange = (newFormat: "json" | "xml") => {
    try {
      if (format === "json" && newFormat === "xml") {
        const obj = JSON.parse(content);
        const xml = builder.build({ root: obj });
        setContent(xml || "<root></root>");
        setError(null);
      } else if (format === "xml" && newFormat === "json") {
        const obj = parser.parse(content);
        const data = typeof obj.root === "string" ? {} : obj.root;
        const jsonStr = JSON.stringify(data, null, 2);
        setContent(jsonStr || "{}");
        setError(null);
      }
      setFormat(newFormat);
    } catch (err) {
      console.error("Erro na conversão:", err);
      setError(`Erro: ${format.toUpperCase()} inválido. Corrija antes de trocar o formato.`);
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <Select
        value={format}
        onValueChange={(value:string) => handleFormatChange(value as "json" | "xml")}
      >
        <SelectTrigger className="w-24 border border-separators/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="json">JSON</SelectItem>
          <SelectItem value="xml">XML</SelectItem>
        </SelectContent>
      </Select>

      {error && (
        <div className="p-1 bg-red-500 text-white rounded">
          {error}
        </div>
      )}

      <CodeMirror
        value={content}
        height="240px"
        theme={resolvedTheme == "dark" ? "dark" : "light"}

        extensions={[format === "json" ? json() : xml()]}
        onChange={(value) => handleContentChange(value)}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          foldGutter: true,
        }}
        className="text-separators rounded-xl text-[16px] overflow-hidden border"
      />
    </div>
  );
}