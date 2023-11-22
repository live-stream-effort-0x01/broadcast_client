import { MessageArg } from "~/types/message";
import "./Message.css";
import { Component } from "solid-js";

const  MessageAdmin:Component<MessageArg>=(props) =>{
  return (
    <>
      <li class="message sent admin-msg">
        <div class="message-content">
          <div class="message-sender">{props.username}</div>
          <div class="message-text"> {props.content} </div>
        </div>
      </li>
    </>
  );
}
export default MessageAdmin