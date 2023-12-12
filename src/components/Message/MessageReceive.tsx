import { MessageArg } from "~/types/message";
import "./Message.css";
import { Component } from "solid-js";
const MessageReceive:Component<MessageArg>=(props: MessageArg) =>{
  return (
    <>
      <li class="message received">
        <div class="message-content">
          <div class="message-sender">{props.username}</div>
          <div class="message-text">{props.content}</div>
        </div>
      </li>
    </>
  );
}
export default  MessageReceive