import { toast } from "sonner";
import { create } from "zustand";

import { connectionStorage } from "@/storages/connectionStorage";

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
};

export const useWebSocketStore = create<WebSocketStore>((set, get) => {
  const savedToken = connectionStorage.getToken();
  const savedUri = connectionStorage.getUri();

  return {
    socket: null,
    isConnected: false,
    runTest: false,
    setRunTest: (value: boolean) => set({ runTest: value }),
    token: savedToken,
    uri: savedUri,
    test: false,
    setTest: (value: boolean) => set({ test: value }),

    connect: (baseUrl, token) => {
      if (get().isConnected) {
        toast.warning("Já está conectado ao Executor");
        return;
      }

      if (token) {
        connectionStorage.setToken(token);
        set({ token });
      } else {
        token = get().token || undefined;
      }

      if (!token) {
        toast.error("Token necessário para conectar");
        return;
      }

      connectionStorage.setUri(baseUrl);
      set({ uri: baseUrl });

      const cleanBase = baseUrl.replace(/\/+$/, "");
      const url = `${cleanBase}?token=${token}`;

      const socket = new WebSocket(url);

      socket.onopen = () => {
        toast.success("Conectado ao Executor");
        set({ isConnected: true });
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.status === "start-config") {
            set({ test: true });
            set({ runTest: true });
          }

          if (data.status === "final-metrics" || data.status === "aborted") {
            set({ runTest: false });
          }
          console.log(event.data);
        } catch {
          console.warn(
            "Mensagem recebida não está no formato JSON:",
            event.data
          );
          toast.warning("Mensagem recebida inválida.");
        }
      };

      socket.onclose = () => {
        toast.error("Executor desconectado");
        set({ isConnected: false, socket: null });
      };

      socket.onerror = (err) => {
        console.error("Erro Executor:", err);
        toast.error("Erro na conexão com o Executor");
        socket.close();
      };

      set({ socket });
    },

    disconnect: () => {
      get().socket?.close();
      connectionStorage.clearAll();
      toast.info("Conexão encerrada");
      set({ socket: null, isConnected: false, token: null, uri: null });
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
