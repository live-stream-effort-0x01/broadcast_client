import { MessageArg } from "~/types/message";
import "./Message.css";

export default function MessageAdmin(props: MessageArg) {
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
