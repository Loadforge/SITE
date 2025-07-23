import { toast } from "sonner";
import { create } from "zustand";

import { connectionStorage } from "@/storages/connectionStorage";

type Message = {
  id: string;
  text: string;
};

type WebSocketStore = {
  socket: WebSocket | null;
  messages: Message[];
  isConnected: boolean;
  runTest: boolean;
  setRunTest: (value: boolean) => void;
  token: string | null;
  uri: string | null;
  connect: (baseUrl: string, token?: string) => void;
  disconnect: () => void;
  sendMessage: (text: string) => void;
};

export const useWebSocketStore = create<WebSocketStore>((set, get) => {
  const savedToken = connectionStorage.getToken();
  const savedUri = connectionStorage.getUri();

  return {
    socket: null,
    messages: [],
    isConnected: false,
    runTest: false,
    setRunTest: (value: boolean) => set({ runTest: value }), 
    token: savedToken,
    uri: savedUri,

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
          set((state) => ({ messages: [...state.messages, data] }));
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
        const msg = { id: crypto.randomUUID(), text };
        sock.send(JSON.stringify(msg));
        toast.success("Mensagem enviada");
      } else {
        toast.error("Não conectado ao WebSocket");
      }
    },
  };
});