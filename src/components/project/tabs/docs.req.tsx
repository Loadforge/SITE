import CodeMirror from "@uiw/react-codemirror";

import { useTheme } from "@/contexts";
import { useState } from "react";

export function DocsReq() { 
    const { resolvedTheme } = useTheme();
    const [content,setContent] = useState<string>("");
    
    const handleContentChange = (value: string) => {
        setContent(value);
    }
return(
    <div className="p-1">
        <CodeMirror
            value={content}
            theme={resolvedTheme == "dark" ? "dark" : "light"}
            height="240px"
            placeholder={"Write a comment"}
            onChange={(value) => handleContentChange(value)}
            basicSetup={{
                lineNumbers: true,
                highlightActiveLine: true,
                foldGutter: true,
            }}
            className="text-separators rounded-xl text-[16px] overflow-hidden border"/>
    </div>
)}