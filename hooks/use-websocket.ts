import { useEffect, useRef, useState } from "react";

export default function useWebSocket(url: string, id: string) {
    const ws = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const connect = () => {
            ws.current = new WebSocket(url);

            ws.current.onopen = () => {
                console.log("%c[GatewaySocket] %c[CONNECT] %c" + url,
                    "color: purple; font-weight: bold;",
                    "color: green; font-weight: bold;",
                    "color: blue;"
                );
                setIsConnected(true);
            };
        };

        connect(); // Iniciar la conexión

        return () => {
            ws.current?.close(); // Cerrar la conexión al desmontar
        };
    }, [url]);

    return { ws, isConnected };
}