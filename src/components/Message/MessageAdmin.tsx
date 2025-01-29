import React from "react";
import "./Message.css";

interface MessageArg {
  username: string;
  content: string;
}

const MessageAdmin: React.FC<MessageArg> = (props) => {
  return (
    <li className="message sent admin-msg">
      <div className="message-content">
        <div className="message-sender">{props.username}</div>
        <div className="message-text">{props.content}</div>
      </div>
    </li>
  );
};

export default MessageAdmin;
