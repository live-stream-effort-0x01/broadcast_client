import React, { useState, useRef } from "react";
import "./ChatFooter.css";

import icon from "../../../components/icon";

interface ListArg {
  sendMessage: (message: string) => Promise<void>;
}

const ChatFooter: React.FC<ListArg> = (props) => {
  const [height, setHeight] = useState(38);
  const inputRef = useRef<HTMLTextAreaElement>(null); // Sử dụng useRef thay vì createSignal cho tham chiếu DOM

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      if (inputRef.current) inputRef.current.value += "\n";
      if (height < 152) {
        setHeight(height + 19);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!inputRef.current?.value.trim()) return;
      props.sendMessage(inputRef.current.value);
      if (inputRef.current) inputRef.current.value = "";
      setHeight(38);
    }
  };

  return (
    <div className="chat-footer">
      <textarea
        className="message-input"
        placeholder="Type your message here..."
        ref={inputRef}
        rows={1}
        maxLength={200}
        onKeyDown={handleKeyDown}
        style={{
          resize: "none",
          height: `${height}px`,
        }}
      />
      <div className="send-message">
        <img src={icon.sendIcon} alt="" className="send-message-icon" />
      </div>
    </div>
  );
};

export default ChatFooter;
