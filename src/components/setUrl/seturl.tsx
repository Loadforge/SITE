import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProjectStore } from "@/stores/project.store";

import { Button, Input } from "../ui";

export function SetUrl() {
  const { selectedRequest, setSelectedRequest } = useProjectStore();

  if (!selectedRequest) {
    return null;
  }

  const handleSend = () => {
    console.log("Method:", selectedRequest?.method);
    console.log("URL:", selectedRequest?.url);
  };

  return (
    <div className="flex items-center w-full">
      <Select
        value={selectedRequest?.method || "GET"}
        onValueChange={(value: string) =>
          setSelectedRequest({
            ...selectedRequest,
            method: value as "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
          })
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
        className="rounded-l-none w-5xl mr-5 border-separators/50 placeholder:text-text/50"
        value={selectedRequest?.url || ""}
        onChange={(e) =>
          setSelectedRequest({
            ...selectedRequest,
            url: e.target.value,
          })
        }
        placeholder="https://"
      />

      <Button className="w-25 font-bold text-xl" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
}
