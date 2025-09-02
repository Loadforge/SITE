import { toast } from "sonner";
import { create } from "zustand";

import { connectionStorage } from "@/storages/connectionStorage";
import { RequestFormData } from "@/validators";

type WebSocketStore = {
  socket: WebSocket | null;
  isConnected: boolean;
  runTest: boolean;
  setRunTest: (value: boolean) => void;
  setTest: (value: boolean) => void;
  token: string | null;
  uri: string | null;
  connect: (baseUrl: string, token?: string) => void;
  disconnect: () => void;
  sendMessage: (text: any) => void;
  test: boolean;
  duration: number;
  startconfigData: any | null;
  processData: RequestFormData[] | null;
  finalMetrics: any | null;
  isConnecting: boolean;
};

export const useWebSocketStore = create<WebSocketStore>((set, get) => {
  const savedToken = connectionStorage.getToken();
  const savedUri = connectionStorage.getUri();

  let processBuffer: RequestFormData[] = [];
  let processTimer: ReturnType<typeof setTimeout> | null = null;

  const flushProcess = () => {
    if (processBuffer.length > 0) {
      set((state) => ({
        processData: state.processData
          ? [...state.processData, ...processBuffer]
          : [...processBuffer],
      }));
      set({ test: true, runTest: true });
      processBuffer = [];
    }
  };

  return {
    socket: null,
    isConnected: false,
    runTest: false,
    setRunTest: (value: boolean) => set({ runTest: value }),
    token: savedToken,
    uri: savedUri,
    test: false,
    duration: 0,
    setTest: (value: boolean) => set({ test: value }),
    startconfigData: null,
    processData: null,
    finalMetrics: null,
    isConnecting: false,

    connect: (baseUrl, token) => {
      if (get().isConnected || get().isConnecting) return;

      set({ isConnecting: true });

      const finalToken = token || get().token;
      if (!finalToken) {
        toast.error("Token necessário para conectar");
        set({ isConnecting: false });
        return;
      }

      connectionStorage.setToken(finalToken);
      connectionStorage.setUri(baseUrl);
      set({ token: finalToken, uri: baseUrl });

      const cleanBase = baseUrl.replace(/\/+$/, "");
      const url = `${cleanBase}?token=${finalToken}`;
      const socket = new WebSocket(url);

      socket.onopen = () => {
        set({ isConnected: true, isConnecting: false, socket });
        toast.success("Conectado ao Executor");
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.status === "start-config") {
            set({ test: true });
            set({ duration: data.config.duration });
            console.log("Duração do teste:", data.config.duration);
            set({ startconfigData: data });
          }

          if (data.status === "process") {
            const processData: RequestFormData = {
              duration_ms: data.duration_ms,
              http_status: data.http_status,
            };

            // acumula no buffer
            processBuffer.push(processData);

            // agenda flush a cada 300ms
            if (!processTimer) {
              processTimer = setTimeout(() => {
                flushProcess();
                processTimer = null;
              }, 300);
            }
          }

          if (data.status === "final_metrics" || data.status === "aborted") {
            flushProcess(); // garante flush final
            set({ test: false });
            set({ finalMetrics: data });
            set({ processData: null });
          }

          console.log(event.data);
        } catch {
          console.warn("Mensagem recebida não está no formato JSON:", event.data);
          toast.warning("Mensagem recebida inválida.");
        }
      };

      socket.onclose = () => {
        set({ isConnected: false, isConnecting: false, socket: null });
        toast.error("Executor desconectado");
      };

      socket.onerror = (err) => {
        console.error("Erro Executor:", err);
        set({ isConnecting: false });
        toast.error("Erro na conexão com o Executor");
      };
    },

    disconnect: () => {
      get().socket?.close();
      connectionStorage.clearAll();
      set({
        socket: null,
        isConnected: false,
        isConnecting: false,
        token: null,
        uri: null,
      });
      toast.info("Conexão encerrada");
    },

    sendMessage: (text) => {
      const sock = get().socket;
      if (sock?.readyState === WebSocket.OPEN) {
        sock.send(JSON.stringify(text));
        toast.success("Mensagem enviada");
      } else {
        toast.error("Não conectado ao WebSocket");
      }
    },
  };
});
