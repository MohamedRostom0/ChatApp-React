import React, { useEffect, useState } from "react";
import { API_WS_DOMAIN } from "../../constants";
import { useSelector } from "react-redux";

interface NewMessageFormProps {
  onMessageSent: () => void; // Function to call when a new message is sent
}

export const NewMessage: React.FC<NewMessageFormProps> = ({
  onMessageSent,
}) => {
  const auth = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket(
      `${API_WS_DOMAIN}/chat/ws?token=${auth.token}`
    );
    setWs(websocket);

    websocket.onmessage = (event: MessageEvent) => {
      const echoedMessage = event.data;
      console.log("Received:", echoedMessage);
      onMessageSent();
    };

    // Cleanup on component unmount
    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      console.log("Sending:", newMessage);
      ws.send(newMessage);
      setNewMessage("");
      onMessageSent();
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Send
      </button>
    </div>
  );
};
