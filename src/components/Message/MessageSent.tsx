import { MessageArg } from "~/types/message";
import "./Message.css";
import { Component } from "solid-js";
const MessageSent:Component<MessageArg>=(props: MessageArg)=> {
  return (
    <>
      <li class="message sent">
        <div class="message-content">
          <div class="message-text"> {props.content} </div>
        </div>
      </li>
    </>
  );
}
export default MessageSent