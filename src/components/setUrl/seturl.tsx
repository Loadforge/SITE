import { Button, Input } from "../ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SetUrl() {
  return (
    <div className="flex items-center w-full">
      <Select defaultValue="POST">
        <SelectTrigger className="w-24 border rounded-r-none border-separators/50">
          <SelectValue/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="GET">GET</SelectItem>
          <SelectItem value="POST">POST</SelectItem>
          <SelectItem value="PUT">PUT</SelectItem>
          <SelectItem value="PATCH">PATCH</SelectItem>
          <SelectItem value="DELETE">DELETE</SelectItem>
        </SelectContent>
      </Select>

      <Input className="rounded-l-none w-5xl mr-5 border-separators/50"/>
      <Button className="w-25 font-bold">Send</Button>
    </div>
  );
}
