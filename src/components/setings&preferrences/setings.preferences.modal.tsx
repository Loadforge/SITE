"use client";

import { Settings, SlidersHorizontal } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  SettingsPreferencesTabs,
  SettingsPreferencesTabsList,
  SettingsPreferencesTabsTrigger,
  SettingsPreferencesTabsContent,
} from "./setings.preferences.tabs";
import { PreferencesTab } from "./tabs";
import { SettingsTab } from "./tabs";

export type SettingsPreferencesModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

export function SettingsPreferencesModal({
  onClose,
  isOpen,
}: SettingsPreferencesModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-background/80 flex justify-center items-start pt-14 z-10"
      onClick={onClose}
    >
      <div
        className="bg-background-secondary rounded-lg shadow-xl w-5/8 max-w-6xl h-[75vh] flex overflow-hidden"
        onClick={handleModalClick}
      >
        <SettingsPreferencesTabs defaultValue="preferences">
          <SettingsPreferencesTabsList>
            <div className="space-y-2">
              <SettingsPreferencesTabsTrigger value="preferences">
                <SlidersHorizontal className="size-4" />
                {t("Preferences")}
              </SettingsPreferencesTabsTrigger>
              <SettingsPreferencesTabsTrigger value="settings">
                <Settings className="size-4" />
                {t("Api_Connection")}
              </SettingsPreferencesTabsTrigger>
            </div>

            <div className="text-sm flex justify-center text-text font-bold pt-6">
              {t("Version")}: 1.0.0
            </div>
          </SettingsPreferencesTabsList>

          <SettingsPreferencesTabsContent value="preferences">
            <PreferencesTab />
          </SettingsPreferencesTabsContent>

          <SettingsPreferencesTabsContent value="settings">
            <SettingsTab onClose={onClose}/>
          </SettingsPreferencesTabsContent>
        </SettingsPreferencesTabs>
      </div>
    </div>
  );
}
