import React, { useEffect } from "react";
import MessageReceive from "../../../components/Message/MessageReceive";
import MessageSent from "../../../components/Message/MessageSent";
import MessageAdmin from "../../../components/Message/MessageAdmin";
import MessageError from "../../../components/Message/MessageError";
import MessageRequest from "../../../components/Message/MessageRequest";
import "./ChatBody.css";
import { Message, MessageType } from "../../../types/message";

interface ChatBodyProps {
  messages: Message[];
  containerRef: React.RefObject<HTMLDivElement>;
}

const ChatBody: React.FC<ChatBodyProps> = ({ messages, containerRef }) => {
  useEffect(() => {
    if (messages.length > 0 && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, containerRef]);

  return (
    <div className="chat-body" ref={containerRef}>
      <ul className="message-list scroll">
        {messages.map((msg, i) => {
          switch (msg.type) {
            case MessageType.SEND:
              return <MessageSent key={i} {...msg.content} />;
            case MessageType.RECEIVE:
              return <MessageReceive key={i} {...msg.content} />;
            case MessageType.ADMIN:
              return <MessageAdmin key={i} {...msg.content} />;
            case MessageType.ERROR:
              return <MessageError key={i} {...msg.content} />;
            case MessageType.SPECIAL_REQUEST:
              return <MessageRequest key={i} {...msg.content} />;
            default:
              return null;
          }
        })}
      </ul>
    </div>
  );
};

export default ChatBody;
