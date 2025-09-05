import { useEffect } from "react";
import { toast } from "sonner";

import { useWebSocketStore } from "@/contexts/socket/websocketStore";

export function TestExecutionToast() {
  const { test } = useWebSocketStore();
  const toastId = "test-execution-toast";

  useEffect(() => {
    if (test === true) {
      toast.custom(
        () => (
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md p-4 w-[300px] shadow">
            <p className="font-medium text-sm">Teste de carga em execução...</p>
          </div>
        ),
        {
          id: toastId,
          position: "top-right",
          duration: Infinity,
        }
      );
    }
    if (test === false) {
      toast.dismiss(toastId);
    }
  }, [test]);

  return null;
}
