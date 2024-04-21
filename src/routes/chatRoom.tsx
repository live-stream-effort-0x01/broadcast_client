import { createEffect, createResource, createSignal, Component } from "solid-js";
import { Room } from "livekit-client";
import { connectRoom } from "~/lib/livekit/livekit-helper";
import { inviteRoom, Broadcasts, getBroadcasts } from "~/lib/services/broadcasts";
import HeaderChatRoom from "~/components/HeaderChatRoom/HeaderChatRoom";
import { isLogin } from "~/lib/services/auth";
import VideoWindow from "~/components/video/VideoWindow/VideoWindow";
import ChatWindow from "~/components/Chat/ChatWindow/ChatWindow";
import Avatar from "../components/images/F-Avatar.png"
import starIcon from '~/components/icon/send_icon.svg'

const ChatRoom: Component = () => {
  // Initialize Solid signals
  const room = new Room();
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);

  // Effect to handle room invitation
  createEffect(() => {
    // Invite user to the room
    const invite = async () => {
      const roomName = await sessionStorage.getItem("roomName");
      const name = await sessionStorage.getItem("userName");
      const fechApi = await inviteRoom({ room_name: roomName, identity: name });
      connectRoom(room, fechApi);
    };
    invite();
  }, [room]);

  // Effect to track login status
  createEffect(() => {
    setLoggedIn(isLogin());
  });

  return (
    <main class="home-warrper">
      <div class="home-header">
        <HeaderChatRoom />
      </div>
      <div class="chatroom-container">
        {/* Video and chat windows */}

        <div class="chatroom-video">
          <VideoWindow room={room} />
        </div>
        <div class="chatroom-comment">
          <ChatWindow room={room} />
        </div>
      </div>
      <div class='streamer-profile-container'>
        <div class="streamer-avatar-container">
          <img class="streamer-avatar" src={Avatar} alt="avatar" />
          <div class="streamer-info">
            <p class="streamer-name">QuantumQuest</p>
            <p class="streamer-description">
              Welcome to QuantumQuest, where gaming meets the infinite expanse of the universe! NovaStar, your guide through the cosmos, is here to lead you on thrilling adventures across galaxies and dimensions.</p>
          </div>
          <div class="streamer-follow-subscribe">
            <div class="streamer-subscribe-container">
              <button class="subscribe-btn">+ Subscribe</button>
            </div>
          </div>
        </div>
        <div class="streamer-about-container">
          <p class="streamer-about-title">About QuantumQuest</p>
        </div>
        <div class="streamer-about-content">
          <p class="streamer-about-description">Schedule:
            📅 Monday to Friday: 7 PM - 11 PM (GMT)
            📅 Weekends: Galactic Marathons & Viewer Choice Nights!
            <br></br>
            Interact:
            🌠 Live Q&A sessions
            🎁 Giveaways & Loot Drops
            🛸 Viewer Challenges
            <br></br>
            Dive into the cosmos with NovaStar and unlock the secrets of QuantumQuest! 🚀✨</p>
        </div>
      </div>


    </main>
  );
};

export default ChatRoom;
