import { toast } from "sonner";
import { create } from "zustand";

type Message = {
  id: string;
  text: string;
};

type WebSocketStore = {
  socket: WebSocket | null;
  messages: Message[];
  isConnected: boolean;
  connect: (baseUrl: string, token?: string) => void;
  disconnect: () => void;
  sendMessage: (text: string) => void;
};

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,
  messages: [],
  isConnected: false,

  connect: (baseUrl, token) => {
    if (get().isConnected) {
      toast.warning("Já está conectado ao Executor");
      return;
    }

    if (get().socket) {
      get().socket.close();
    }

    const cleanBase = baseUrl.replace(/\/+$/, "");
    const url = `${cleanBase.replace(/^http/, "ws")}/ws${token ? `?token=${token}` : ""}`;

    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("Conectado ao Executor:", url);
      toast.success("Conectado ao Executor");
      set({ isConnected: true });
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        set((state) => ({ messages: [...state.messages, data] }));
      } catch {
        console.warn("Mensagem recebida não está no formato JSON:", event.data);
        toast.warning("Mensagem recebida inválida.");
      }
    };

    socket.onclose = () => {
      console.log("Executor desconectado");
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
    toast.info("Conexão encerrada");
    set({ socket: null, isConnected: false });
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
}));
