import React, { useState, useRef } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Method, Request } from "@/db/types";

import { Button, Input } from "../ui";

interface Props {
  request: Request;
  handleUpdateMethodRequest: (id: string, method: string) => void;
  handleUpdateUrlRequest: (id: string, url: string) => void;
}

export function SetUrl({
  request,
  handleUpdateMethodRequest,
  handleUpdateUrlRequest,
}: Props) {
  const [method, setMethod] = useState(request.method);
  const [url, setUrl] = useState(request.url);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMethodChange = (newMethod: Method) => {
    setMethod(newMethod);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleUpdateMethodRequest(request.id, newMethod);
    }, 500);
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!request.id) {
        toast.error("ID da requisição não encontrado!");
        return;
      }

      handleUpdateUrlRequest(request.id, newUrl);
    }, 500);
  };

  return (
    <div className="flex items-center w-full">
      <Select value={method} onValueChange={handleMethodChange}>
        <SelectTrigger className="w-24 border rounded-r-none border-separators/50">
          <SelectValue placeholder="Método" />
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
        className="rounded-l-none w-full mr-5 border-separators/50 placeholder:text-text/50"
        value={url}
        onChange={(e) => handleUrlChange(e.target.value)}
        placeholder="https://"
      />

      <Button className="w-25 font-bold text-xl" disabled>
        Send
      </Button>
    </div>
  );
}
