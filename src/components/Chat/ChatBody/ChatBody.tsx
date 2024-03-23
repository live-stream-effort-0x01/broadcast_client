import { For, Switch, Match, createEffect, on } from "solid-js";
import MessageReceive from "~/components/Message/MessageReceive";
import MessageSent from "~/components/Message/MessageSent";
import MessageAdmin from "~/components/Message/MessageAdmin";
import MessageError from "~/components/Message/MessageError";
import MessageRequest from "~/components/Message/MessageRequest";
import "./ChatBody.css";
import { Message, MessageType } from "~/types/message";
import { Component } from "solid-js";
export interface ChatBodyProps {
  messages: () => Array<Message>;
  containerRef: any;
}

const ChatBody: Component<ChatBodyProps> = (props) =>{
  createEffect(
    on(
      () => props.messages.length,
      () => (props.containerRef.scrollTop = props.containerRef.scrollHeight)
    )
  );

  return (
    <div class="chat-body " ref={props.containerRef}>
      <ul class="message-list ">
        <For each={props.messages()}>
          {(msg, i) => (
            <Switch>
              <Match when={msg.type == MessageType.SEND}>
                <MessageSent {...msg.content} />
              </Match>
              <Match when={msg.type == MessageType.RECEIVE}>
                <MessageReceive {...msg.content} />
              </Match>
              <Match when={msg.type == MessageType.ADMIN}>
                <MessageAdmin {...msg.content} />
              </Match>
              <Match when={msg.type == MessageType.ERROR}>
                <MessageError {...msg.content} />
              </Match>
              <Match when={msg.type == MessageType.SPECIAL_REQUEST}>
                <MessageRequest {...msg.content} />
              </Match>
            </Switch>
          )}
        </For>
      </ul>
    </div>
  );
}
export default ChatBody;