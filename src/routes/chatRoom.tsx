
import './styles.css'
import VideoWindow from '~/components/video/VideoWindow/VideoWindow';
import ChatWindow from '~/components/Chat/ChatWindow/ChatWindow';
import HeaderChatRoom from '~/components/HeaderChatRoom/HeaderChatRoom';
import { Room } from "livekit-client";
import {createEffect } from "solid-js";
import { connectRoom } from "~/lib/livekit/livekit-helper";
import { inviteRoom } from '~/lib/services/broadcasts';
import { useNavigate } from "solid-start";
import { Component } from "solid-js";



const ChatRoom:Component=()=> {
  const room = new Room();
  const navigate = useNavigate();
  createEffect(()=>{

    const invite = async ()=>{
      const roomName = await sessionStorage.getItem('roomName')
      const name =  await sessionStorage.getItem('userName')
      const fechApi = await inviteRoom({room_name:roomName, identity:name})
      connectRoom(room,fechApi)
    }
invite()

     const move = async ()=>{
      const name = await sessionStorage.getItem('roomName')
      if(name ===''|| !name){
        navigate('/')
      }
     }
     move()
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
export default ChatRoom