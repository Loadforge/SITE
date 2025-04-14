import { useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function LanguageToggle() {
  const [language, setLanguage] = useState("English");

  return (
    <div className="flex items-center gap-2 text-lg text-text font-bold">
      <span>Language:</span>
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-[180px] bg-background border-none text-sm text-text p-2 rounded-md focus:outline-none">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Portuguese">Português (BR)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
