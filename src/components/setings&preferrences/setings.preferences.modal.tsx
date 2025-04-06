export type SettingsPreferencesModalProps = {
    onClose: () => void;
    isOpen: boolean;
  };
  
  export function SettingsPreferencesModal({ onClose, isOpen }: SettingsPreferencesModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-background-secondary bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold mb-4">Settings & Preferences</h2>
          <p className="text-gray-700 mb-4">
            Customize your settings and preferences here.
          </p>
        </div>
      </div>
    );
  }
  