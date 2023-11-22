import { createSignal } from "solid-js";
import "./ChatFooter.css";
import { IoSend } from 'solid-icons/io'
import icon from "~/components/icon";
import { Component } from "solid-js";
interface ListArg {
  sendMessage: (message: string) => Promise<void>;
}

const ChatFooter: Component <ListArg>= (props) => {
  const [height, setHeight] = createSignal(38);
 
  let input: any;
  return (
    <div class="chat-footer">
      <textarea
        class="message-input"
        placeholder="Type your message here..."
        ref={input}
        rows={1}
        maxLength={200}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            input.value += "\n";
            if (height() < 152) {
              setHeight(height() + 19);
            }
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (!input.value.trim()) return;
            props.sendMessage(input.value);
            input.value = "";
            setHeight(38);
          }
        }}
        style={{
          resize: "none",
          height: `${height()}px`,
        }}
      />
      <div class="send-message">
        <img src={icon.sendIcon} alt=""class="send-message-icon" />
      </div>
    </div>
  );
}
export default ChatFooter;