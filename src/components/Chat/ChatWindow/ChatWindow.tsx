
import { createSignal, onCleanup, onMount } from "solid-js";
import ChatFooter from "../ChatFooder/ChatFooter";
import "./ChatWindow.css";
import { DataPacket_Kind, Room, RoomEvent } from "livekit-client";
import { Message, MessageType } from "~/types/message";
import ChatBody from "~/components/Chat/ChatBody/ChatBody";
import { MOCK_USER_ID } from "~/lib/constants/mock-data";
import { state } from "~/lib/livekit/livekit-helper";
import { Component } from "solid-js";
interface ChatWindowProps {
  room: Room;
}
const ChatWindow: Component<ChatWindowProps>= (props)=> {
  const { room } = props;
  let containerRef: any;
  const [messages, setMessages] = createSignal<Array<Message>>([]);

  const addMessage = async (message: Message) => {
    setMessages([...messages(), message]);
    if (messages().length > 1000) {
      const tempMessages = [...messages()];
      tempMessages.shift();
      setMessages(tempMessages);
    }
  };

  onMount(() => {
    room.on(RoomEvent.DataReceived, (payload, participation) => {
      addMessage({
        content: {
          username: participation?.name || "Unknown user",
          content: state.decoder.decode(payload),
        },
        type: MessageType.RECEIVE,
      });
    });
    onCleanup(() => {
      room.off(RoomEvent.DataReceived, () => {
        console.log("Stop listening RoomEvent.DataReceived");
      });
    });
  });

  const sendMessage = async (msg: string) => {
    addMessage({
      content: {
        username: MOCK_USER_ID,
        content: msg,
      },
      type: MessageType.SEND,
    });
    room.localParticipant.publishData(
      state.encoder.encode(msg),
      DataPacket_Kind.RELIABLE
    );
  };

  return (
   
      <div class='chatwindow-wapper'>
        <ChatBody messages={messages} containerRef={containerRef} />
        <ChatFooter sendMessage={sendMessage} />
      </div>
     
   
  );
}
export default ChatWindow;