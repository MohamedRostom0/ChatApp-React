import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import useHttp from "../../hooks/use-http";
import { getUserChat, MessageResponse } from "../../api/chat";
import { useSelector } from "react-redux";

interface ChatListProps {
  reload: boolean; // Prop to trigger re-fetching of messages
}

export const ChatList: React.FC<ChatListProps> = ({ reload }) => {
  const auth = useSelector((state) => state.auth);
  const [messages, setMessages] = useState<MessageResponse[]>([]);

  const { sendRequest: getUserMessages, data: userMessages } =
    useHttp(getUserChat);

  useEffect(() => {
    if (auth.token) {
      getUserMessages({ userId: auth.user?.id, token: auth.token });
    }
  }, [auth.token, getUserMessages, reload]);

  useEffect(() => {
    if (userMessages) {
      setMessages(userMessages);
    }
    console.log(userMessages);
  }, [userMessages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Chat window */}
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="bg-white p-4 shadow-md rounded-md">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.status === "sent" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.status === "sent"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <div className="font-bold">
                  {message.status === "sent" ? "You" : `WSS`}
                </div>
                <div>{message.message}</div>
                <div className="text-sm text-gray-500">
                  {format(new Date(message.timestamp), "PPpp")}{" "}
                  {/* Format the timestamp */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
