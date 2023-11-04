import { MessageArg } from "~/types/message";
import "./Message.css";

export default function MessageRequest(props: MessageArg) {
  return (
    <>
      <li class="message recieve request-msg">
        <div class="message-content">
          <div class="message-sender">{props.username}</div>
          <div class="message-text"> {props.content} </div>
        </div>
      </li>
    </>
  );
}
