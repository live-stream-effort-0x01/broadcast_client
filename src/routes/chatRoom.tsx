
import './styles.css'
import VideoWindow from '~/components/video/VideoWindow/VideoWindow';
import ChatWindow from '~/components/Chat/ChatWindow/ChatWindow';
import HeaderChatRoom from '~/components/HeaderChatRoom/HeaderChatRoom';
import { Room } from "livekit-client";
import { onCleanup,createEffect,onMount,createSignal } from "solid-js";
import { connectRoom } from "~/lib/livekit/livekit-helper";
import { inviteRoom } from '~/lib/services/broadcasts';
export default function ChatRoom() {
  const room = new Room();
  createEffect(()=>{
    const invite = async ()=>{
      const roomName = await sessionStorage.getItem('roomName')
      const fechApi = await inviteRoom({room_name:roomName, identity:'Huy'})
      console.log(fechApi,'a')
      console.log(roomName)
      connectRoom(room, fechApi);
    }
invite()

  },[room])

  
  return (
    <main class='home-warrper' >
      <div class='home-header'><HeaderChatRoom /></div>
      <div class='chatroom-container'>    
      <div class='chatroom-video'> <VideoWindow  room={room}/></div>
      <div class='chatroom-comment'><ChatWindow room={room} /> </div>
      </div>
      </main>
  );
}
