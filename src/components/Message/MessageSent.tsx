import { MessageArg } from "~/types/message";
import "./Message.css";

export default function MessageSent(props: MessageArg) {
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
