import React from "react";
import "./Message.css";

interface MessageArg {
  username: string;
  content: string;
}

const MessageError: React.FC<MessageArg> = (props) => {
  return (
    <li className="message sent error-msg">
      <div className="message-content">
        <div className="message-sender">{props.username}</div>
        <div className="message-text">{props.content}</div>
      </div>
    </li>
  );
};

export default MessageError;
