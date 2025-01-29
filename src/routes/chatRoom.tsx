import './styles.css';
import VideoWindow from '.././components/video/VideoWindow/VideoWindow';
import ChatWindow from '.././components/Chat/ChatWindow/ChatWindow';
import HeaderChatRoom from '.././components/HeaderChatRoom/HeaderChatRoom';
import { Room } from 'livekit-client';
import { useEffect } from 'react';
import { connectRoom } from '.././lib/livekit/livekit-helper';
import { inviteRoom } from '.././lib/services/broadcasts';
import { useNavigate } from 'react-router-dom';

const ChatRoom = () => {
  const room = new Room();
  const navigate = useNavigate();

  useEffect(() => {
    const invite = async () => {
      const roomName = await localStorage.getItem('roomName');
      const name = await localStorage.getItem('userName');
      const fetchedApi = await inviteRoom({ room_name: roomName, identity: name });
      connectRoom(room, fetchedApi);
    };
    invite();

    const move = async () => {
      const name = await localStorage.getItem('roomName');
      if (!name || name === '') {
        navigate('/');
      }
    };
    move();
  }, [room, navigate]);

  return (
    <main className="home-warrper">
      <div className="home-header">
        <HeaderChatRoom />
      </div>
      <div className="chatroom-container">
        <div className="chatroom-video">
          <VideoWindow room={room} />
        </div>
        <div className="chatroom-comment">
          <ChatWindow room={room} />
        </div>
      </div>
    </main>
  );
};

export default ChatRoom;