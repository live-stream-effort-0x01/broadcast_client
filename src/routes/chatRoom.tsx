import { createEffect, createResource, createSignal, Component } from "solid-js";
import { Room } from "livekit-client";
import { connectRoom } from "~/lib/livekit/livekit-helper";
import { inviteRoom, Broadcasts, getBroadcasts } from "~/lib/services/broadcasts";
import HeaderChatRoom from "~/components/HeaderChatRoom/HeaderChatRoom";
import { isLogin } from "~/lib/services/auth";
import VideoWindow from "~/components/video/VideoWindow/VideoWindow";
import ChatWindow from "~/components/Chat/ChatWindow/ChatWindow";

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
        {/* Jumbotron section */}
        {!loggedIn() && broadcasts()?.length === 0 && (
          <div class="jumbotron">
            <h1 class="jumbotron-header">No rooms created</h1>
            <p class="jumbotron-text">Please login to create a room.</p>
          </div>
        )}
        {/* Video and chat windows */}
        {loggedIn() && broadcasts()?.length === 0 && (
          <>
            <div class="chatroom-video">
              <VideoWindow room={room} />
            </div>
            <div class="chatroom-comment">
              <ChatWindow room={room} />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ChatRoom;
