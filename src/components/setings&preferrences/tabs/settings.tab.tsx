import { FormApiConnect } from "../components/formApiConnect/form.api.connect";

export function SettingsTab() {
  return (
    <div className="flex flex-col gap-y-16 h-full">
      <FormApiConnect/> 
      {/* <InDevelopment /> */}
    </div>
  );
}
