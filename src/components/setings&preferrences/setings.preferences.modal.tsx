"use client";

import React from "react";
import {
  SettingsPreferencesTabs,
  SettingsPreferencesTabsList,
  SettingsPreferencesTabsTrigger,
  SettingsPreferencesTabsContent,
} from "./setings.preferences.tabs";
import { Settings, SlidersHorizontal } from "lucide-react";

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
      className="fixed top-0 left-0 w-full h-full bg-background/70 flex justify-center items-start pt-16 "
      onClick={onClose}
    >
      <div
        className="bg-background-secondary rounded-lg shadow-lg w-4/5 max-w-6xl h-[80vh] flex overflow-hidden"
        onClick={handleModalClick}
      >
        <SettingsPreferencesTabs defaultValue="preferences">
          <SettingsPreferencesTabsList>
            <div className="space-y-2">
              <SettingsPreferencesTabsTrigger value="preferences">
                <SlidersHorizontal className="size-4" />
                Preferences
              </SettingsPreferencesTabsTrigger>
              <SettingsPreferencesTabsTrigger value="settings">
                <Settings className="size-4" />
                Settings
              </SettingsPreferencesTabsTrigger>
            </div>

            <div className="text-md flex justify-center text-muted-foreground pt-6 font-bold">
              Version: 1.0.0
            </div>
          </SettingsPreferencesTabsList>

          <SettingsPreferencesTabsContent value="preferences">
            Conteúdo de Preferências
          </SettingsPreferencesTabsContent>

          <SettingsPreferencesTabsContent value="settings">
            Conteúdo de Configurações
          </SettingsPreferencesTabsContent>
        </SettingsPreferencesTabs>
      </div>
    </div>
  );
}
