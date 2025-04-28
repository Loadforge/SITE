import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useTheme } from "@/contexts";
import { RequestDocs } from "@/db/types/docs.type";
import { RequestdocsService } from "@/services/request/docs.request.service";

interface Props {
  id: string;
}

export function DocsReq({ id }: Props) {
  const { resolvedTheme } = useTheme();
  const [docs, setDocs] = useState<RequestDocs>();

  useEffect(() => {
    RequestdocsService.getdocsByRequestId(id).then((docs) => {
      setDocs(docs);
      console.log(docs)
    });
  }, [id]);

  const handleContentChange = (value: string) => {
    if (!docs) return; 

    const updatedDocs = { ...docs, coments: value };
    setDocs(updatedDocs); 

    RequestdocsService.update(updatedDocs)
      .catch(() => {
        toast.error("Erro ao salvar automaticamente");
      });
  };

  return (
    <div className="p-2 flex flex-col gap-2">
      <CodeMirror
        value={docs?.coments || ""}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        height="240px"
        placeholder="Write a comment"
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
