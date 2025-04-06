export type SettingsPreferencesModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

export function SettingsPreferencesModal({
  onClose,
  isOpen,
}: SettingsPreferencesModalProps) {
  if (!isOpen) return null;

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-background-home/70 flex mt-16 justify-center "
      onClick={onClose}
    >
      <div
        className="bg-background-secondary rounded-lg shadow-lg p-6 w-2/3 h-4/5 "
        onClick={handleModalClick}
      ></div>
    </div>
  );
}
