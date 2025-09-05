import { useEffect } from "react";

import { useWebSocketStore } from "@/contexts/socket/websocketStore";

export function SocketConnector() {
  const connect = useWebSocketStore((state) => state.connect);
  const token = useWebSocketStore((state) => state.token);
  const uri = useWebSocketStore((state) => state.uri);

  useEffect(() => {
    if (token && uri) {
      connect(uri, token);
    }
  }, [token, uri, connect]);

  return null; 
}
