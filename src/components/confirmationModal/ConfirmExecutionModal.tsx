"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui";

export type ConfirmExecutionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmExecutionModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmExecutionModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-background/80 flex justify-center items-start pt-14 z-50"
      onClick={onClose}
    >
      <div
        className="bg-background-secondary rounded-lg shadow-xl w-5/8 max-w-xl h-auto flex flex-col p-6"
        onClick={handleModalClick}
      >
        <h2 className="text-xl font-bold mb-4 text-text">
          {t("Executar teste de carga")}
        </h2>

        <p className="text-sm text-muted-foreground mb-6">
          {t("Deseja iniciar o teste de carga com a configuração atual?")}
        </p>

        <div className="flex justify-end gap-3 mt-auto">
          <Button variant="secondary" onClick={onClose}>
            {t("Cancelar")}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {t("Confirmar")}
          </Button>
        </div>
      </div>
    </div>
  );
}
