import React, { useEffect, useState, useRef } from "react";
import ChatFooter from "../ChatFooder/ChatFooter";
import "./ChatWindow.css";
import { DataPacket_Kind, Room, RoomEvent } from "livekit-client";
import { Message, MessageType } from "../../../types/message";
import ChatBody from "../../../components/Chat/ChatBody/ChatBody";
import { MOCK_USER_ID } from "../../../lib/constants/mock-data";
import { state } from "../../../lib/livekit/livekit-helper";

interface ChatWindowProps {
  room: Room;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ room }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Thay ref cho container
  const [messages, setMessages] = useState<Array<Message>>([]);

  const addMessage = async (message: Message) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, message];
      if (updatedMessages.length > 1000) {
        updatedMessages.shift();
      }
      return updatedMessages;
    });
  };

  useEffect(() => {
    const handleDataReceived = (payload: ArrayBuffer, participation: any) => {
      addMessage({
        content: {
          username: participation?.name || "Unknown user",
          content: state.decoder.decode(payload),
        },
        type: MessageType.RECEIVE,
      });
    };

    room.on(RoomEvent.DataReceived, handleDataReceived);

    return () => {
      room.off(RoomEvent.DataReceived, handleDataReceived);
    };
  }, [room]);

  const sendMessage = async (msg: string) => {
    addMessage({
      content: {
        username: MOCK_USER_ID,
        content: msg,
      },
      type: MessageType.SEND,
    });
    room.localParticipant.publishData(
      state.encoder.encode(msg),
      DataPacket_Kind.RELIABLE
    );
  };

  return (
    <div className="chatwindow-wapper">
      <ChatBody messages={messages} containerRef={containerRef} />
      <ChatFooter sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
