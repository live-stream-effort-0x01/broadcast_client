import React from "react";
import "./Message.css";

interface MessageArg {
  content: string;
}

const MessageSent: React.FC<MessageArg> = (props) => {
  return (
    <li className="message sent">
      <div className="message-content">
        <div className="message-text">{props.content}</div>
      </div>
    </li>
  );
};

export default MessageSent;
