import { useEffect, useState } from "react";

import { RequestEntity } from "@/@entities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button, Input } from "../ui";

interface Props {
  selectedRequest: RequestEntity;
}

export function SetUrl({ selectedRequest }: Props) {
  const [method, setMethod] = useState(selectedRequest.method || "GET");
  const [url, setUrl] = useState(selectedRequest.url || "");

  const handleSend = () => {
    console.log("Method:", method);
    console.log("URL:", url);
  };
  useEffect(() => {
    setMethod(selectedRequest.method || "GET");
    setUrl(selectedRequest.url || "");
  }, [selectedRequest]);

  return (
    <div className="flex items-center w-full">
      <Select
        value={method}
        onValueChange={(value: string) =>
          setMethod(value as "GET" | "POST" | "PUT" | "DELETE" | "PATCH")
        }
      >
        <SelectTrigger className="w-24 border rounded-r-none border-separators/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="GET">GET</SelectItem>
          <SelectItem value="POST">POST</SelectItem>
          <SelectItem value="PUT">PUT</SelectItem>
          <SelectItem value="PATCH">PATCH</SelectItem>
          <SelectItem value="DELETE">DELETE</SelectItem>
        </SelectContent>
      </Select>

      <Input
        className="rounded-l-none w-5xl mr-5 border-separators/50"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <Button className="w-25 font-bold text-xl " onClick={handleSend}>
        Send
      </Button>
    </div>
  );
}
