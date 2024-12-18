"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/controllers/client/client";

const friends = [
  {
    id: "0a604b5b-a188-4663-877a-b23c3d43457c",
    name: "Pedro Duarte",
    username: "@marco",
  },
  {
    id: "8c96fb25-f085-4bb7-9336-bf8ce55dc0fa",
    name: "Ana Silva",
    username: "@prueba",
  },
];

export default function Friends() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [currentChannel, setCurrentChannel] = useState<any>(null);

  useEffect(() => {
    // Limpiar el canal actual si ya existe
    if (currentChannel) {
      db.removeChannel(currentChannel);
      setMessages([]);
      setIsTyping(false);
    }

    if (!selectedFriend) return;

    // Crear un canal nuevo basado en el amigo seleccionado
    const channel = db.channel(`chat-${selectedFriend}`);
    setCurrentChannel(channel);

    // Escuchar mensajes del canal
    channel.on("broadcast", { event: "message" }, (payload) => {
      const newMessage = payload.payload.message;
      setMessages((prev) => [...prev, newMessage]);
    });

    // Escuchar evento de escritura
    channel.on("broadcast", { event: "typing" }, (payload) => {
      setIsTyping(payload.payload.typing);
    });

    // Suscribirse al canal
    channel.subscribe();

    return () => {
      // Limpieza del canal al desmontar
      db.removeChannel(channel);
    };
  }, [selectedFriend]);

  const sendMessage = async () => {
    if (!message.trim() || !currentChannel) return;

    await currentChannel.send({
      type: "broadcast",
      event: "message",
      payload: { message },
    });

    setMessage("");
  };

  const handleTyping = async () => {
    if (!currentChannel) return;

    await currentChannel.send({
      type: "broadcast",
      event: "typing",
      payload: { typing: true },
    });

    setTimeout(async () => {
      await currentChannel.send({
        type: "broadcast",
        event: "typing",
        payload: { typing: false },
      });
    }, 2000);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4 space-y-2">
        <h2 className="text-xl font-bold mb-4">Friends</h2>
        {friends.map((friend) => (
          <Button
            key={friend.id}
            variant="ghost"
            className={`w-full justify-start p-2 ${
              selectedFriend === friend.id ? "bg-gray-700" : ""
            }`}
            onClick={() => setSelectedFriend(friend.id)}
          >
            <span className="font-medium">{friend.name}</span>
            <span className="text-gray-400 text-sm ml-2">
              {friend.username}
            </span>
          </Button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-gray-900 text-white flex flex-col">
        {selectedFriend ? (
          <div className="flex flex-col h-full">
            <Card className="flex-1 m-4">
              <CardHeader>
                <CardTitle>
                  Chat with{" "}
                  {friends.find((friend) => friend.id === selectedFriend)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                {/* Mostrar mensajes */}
                <div className="space-y-4 mb-4 overflow-y-auto">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${
                        index % 2 === 0
                          ? "bg-gray-800"
                          : "bg-indigo-600 self-end"
                      }`}
                    >
                      {msg}
                    </div>
                  ))}
                </div>

                {/* Mostrar indicador de escritura */}
                {isTyping && (
                  <p className="text-sm text-gray-400 mb-2">
                    Someone is typing...
                  </p>
                )}

                {/* Input de mensajes */}
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Type a message..."
                    className="flex-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onInput={handleTyping}
                  />
                  <Button onClick={sendMessage}>Send</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a friend to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
