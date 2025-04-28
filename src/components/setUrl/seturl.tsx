import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Method, Request } from "@/db/types";

import { RequestService } from "@/services/request/request.service";

import { Button, Input, Skeleton } from "../ui";

interface Props {
  id: string;
  handleUpdateMethodRequest: (id: string, method: string) => void;
  handleUpdateUrlRequest: (id: string, url: string) => void;
}

export function SetUrl({
  id,
  handleUpdateMethodRequest,
  handleUpdateUrlRequest,
}: Props) {
  const [request, setRequest] = useState<Request>();

  useEffect(() => {
    RequestService.getById(id)
      .then((res) => {
        setRequest(res);
      })
      .catch(() => {
        toast.error("Erro ao buscar a requisição!");
      });
  }, [id]);

  const handleMethodChange = (newMethod: Method) => {
    if (!request) return;
    handleUpdateMethodRequest(request.id, newMethod);
    setRequest({ ...request, method: newMethod });
  };

  const handleUrlChange = (newUrl: string) => {
    if (!request) {
      toast.error("ID da requisição não encontrado!");
      return;
    }

    handleUpdateUrlRequest(request.id, newUrl);
    setRequest({ ...request, url: newUrl });
  };

  if (!request) {
    return (
      <div className="flex items-center w-full gap-2">
        <Skeleton className="h-10 w-24 rounded-r-none" />
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-24" />
      </div>
    );
  }

  return (
    <div className="flex items-center w-full">
      <Select value={request.method} onValueChange={handleMethodChange}>
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
        value={request.url}
        onChange={(e) => handleUrlChange(e.target.value)}
        placeholder="https://"
      />

      <Button className="w-25 font-bold text-xl" disabled>
        Send
      </Button>
    </div>
  );
}
