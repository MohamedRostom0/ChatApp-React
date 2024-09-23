import React, { useState } from "react";
import { ChatList } from "../components/chat-page/ChatList";
import { NewMessage } from "../components/chat-page/NewMessage";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/auth";
import { useNavigate } from "react-router-dom";

export const ChatPage: React.FC = () => {
  const [loadMessages, setLoadMessages] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewMessage = () => {
    setLoadMessages((state) => !state);
  };

  const onLogoutClicked = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100 p-4">
        <div className="flex w-[100%]">
          <button
            className="ml-auto bg-red-400 text-white px-4 py-2 rounded"
            onClick={onLogoutClicked}
          >
            Logout
          </button>
        </div>
        <ChatList reload={loadMessages} />
        <NewMessage onMessageSent={handleNewMessage} />
      </div>
    </>
  );
};
