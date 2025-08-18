"use client";

import React from "react";

import { Button } from "../ui";

export type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
};

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirmar",
}: ConfirmModalProps) {

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
          {title}
        </h2>

        <p className="text-sm text-muted-foreground mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-auto">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
