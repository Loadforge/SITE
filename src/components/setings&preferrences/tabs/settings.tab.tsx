import { FormApiConnect } from "../components/formApiConnect/form.api.connect";

type TypeProps = {
  onClose: () => void;
};

export function SettingsTab({onClose}:TypeProps) {
  return (
    <div className="flex flex-col gap-y-16 h-full">
      <FormApiConnect onClose={onClose}/> 
      {/* <InDevelopment /> */}
    </div>
  );
}
