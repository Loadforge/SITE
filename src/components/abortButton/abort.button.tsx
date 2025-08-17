import { useTranslation } from 'react-i18next';
import { Button } from "../ui/button";
import { ConfirmModal } from "@/components/confirmationModal/ConfirmModal";
import { useState } from 'react';
import { useWebSocketStore } from '@/contexts/socket/websocketStore';

export function AbortButton() {
const { test, sendMessage } = useWebSocketStore();    
const [isModalOpen, setIsModalOpen] = useState(false);
const { t } = useTranslation();

if(!test) return null;

function handleAbort(){
    sendMessage("abort");
    setIsModalOpen(false);
}
  return (
    <>
    <Button
      className="flex items-center gap-2"
      onClick={() => setIsModalOpen(true)}
    >
      Abortar
    </Button>

    <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAbort} 
        title={"Abortar teste de carga"} 
        message={"Deseja abortar a execução do teste de carga em andamento?"}
        confirmLabel="Abortar"/>
    </>
  );
}
