
import { MessageArg } from "~/types/message";
import "./Message.css";
import { Component } from "solid-js";
const MessageError :Component<MessageArg> =(props: MessageArg) =>{
  return (
    <>
      <li class="message sent error-msg">
        <div class="message-content">
          <div class="message-sender">{props.username}</div>
          <div class="message-text"> {props.content} </div>
        </div>
      </li>
    </>
  );
}
export default MessageError