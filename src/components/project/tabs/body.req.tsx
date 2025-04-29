import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import CodeMirror from "@uiw/react-codemirror";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/contexts";
import { RequestBody } from "@/db/types";
import { RequestBodyService } from "@/services/request/body.request.service";
interface Props {
  id: string;
}

export function BodyReq({ id }: Props) {
  const [body, setBody] = useState<RequestBody>();
  const [format, setFormat] = useState<"json" | "xml" | "none">("none");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  const parser = new XMLParser();
  const builder = new XMLBuilder({
    format: true,
    indentBy: "  ",
    ignoreAttributes: false,
  });
  useEffect(() => {
    RequestBodyService.getBodyByRequestId(id).then((body) => {
      setBody(body);
      setFormat(body.type);
      setContent(body.content);
    });
  }, [id]);

  const handleContentChange = (value: string) => {
    setContent(value);

    if (body) {
      const updatedBody: RequestBody = {
        ...body,
        content: value,
      };

      RequestBodyService.update(updatedBody).catch((err) => {
        setError("Erro ao salvar corpo da requisição.");
        console.error(err);
      });
    }

    setError(null);
  };

  const handleFormatChange = (newFormat: "json" | "xml" | "none") => {
    if (newFormat === "none") {
      setFormat("none");
      setContent("");
      setError(null);
      if (body) {
        const updatedBody: RequestBody = {
          ...body,
          content: "",
        };

        RequestBodyService.update(updatedBody).catch((err) => {
          setError("Erro ao salvar corpo da requisição.");
          console.error(err);
        });
      }

      return;
    }

    try {
      let converted = content;

      if (format === "none") {
        converted = newFormat === "json" ? "{}" : "<root></root>";
      } else if (format === "json" && newFormat === "xml") {
        const obj = JSON.parse(content);
        converted = builder.build({ root: obj }) || "<root></root>";
      } else if (format === "xml" && newFormat === "json") {
        const obj = parser.parse(content);
        const data = typeof obj.root === "string" ? {} : obj.root;
        converted = JSON.stringify(data, null, 2) || "{}";
      }

      setFormat(newFormat);
      setContent(converted);
      if (body) {
        const updatedBody: RequestBody = {
          ...body,
          type: newFormat,
          content: converted,
        };

        RequestBodyService.update(updatedBody).catch((err) => {
          setError("Erro ao salvar corpo da requisição.");
          console.error(err);
        });
      }

      setError(null);
    } catch (err) {
      console.error("Erro na conversão:", err);
      setError(
        `Erro: ${format.toUpperCase()} inválido. Corrija antes de trocar o formato.`
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        value={format}
        onValueChange={(value: string) =>
          handleFormatChange(value as "json" | "xml" | "none")
        }
      >
        <SelectTrigger className="w-24 border border-separators/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="json">JSON</SelectItem>
          <SelectItem value="xml">XML</SelectItem>
          <SelectItem value="none">None</SelectItem>
        </SelectContent>
      </Select>

      {error && (
        <div className="p-1 bg-red-500 text-white rounded">{error}</div>
      )}

      {format === "none" ? (
        <div className="h-[240px] flex items-center justify-center border rounded-xl text-muted-foreground text-center text-sm bg-muted/30">
          Sem corpo na requisição.
        </div>
      ) : (
        <CodeMirror
          value={content}
          height="45dvh"
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
      )}
    </div>
  );
}
