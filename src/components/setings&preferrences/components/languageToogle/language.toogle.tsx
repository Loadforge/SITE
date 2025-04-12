import { useState } from "react";

export function LanguageToggle() {
  const [language, setLanguage] = useState("English");

  return (
    <div className="flex items-center gap-2 text-lg text-text font-bold">
      <span>Language:</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-background border-none text-sm text-text p-2 rounded-md focus:outline-none "
      >
        <option value="English">English</option>
        <option value="Portuguese">Portuguese</option>
      </select>
    </div>
  );
}
