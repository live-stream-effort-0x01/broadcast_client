import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteRoom } from '../../../lib/services/broadcasts';
import Avatar from '../../../components/images/img_avatar.png';
import icon from '../../../components/icon';
import Popup from '../../../components/Popup/Popup';
import DisconnetNoti from '../../../components/Notification/DisconnetNoti';
import { Room, createLocalVideoTrack, createLocalAudioTrack } from 'livekit-client';
import './VideoWinow.css';

const VideoWindow = ({ room }) => {
  const navigate = useNavigate();
  const videoElement = useRef(null);
  const [turnCamera, setTurnCamera] = useState(false);
  const [turnShare, setTurnShare] = useState(false);
  const [turnMic, setTurnMic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleAudio = async () => {
    setTurnMic(!turnMic);
    const enabled = room.localParticipant.isMicrophoneEnabled;
    await room.localParticipant.setMicrophoneEnabled(!enabled);
    const audioTrack = await createLocalAudioTrack({
      echoCancellation: true,
      noiseSuppression: true,
    });
    await room.localParticipant.publishTrack(audioTrack);
  };

  const toggleVideo = async () => {
    setTurnCamera(!turnCamera);
    const localVideoTrack = await createLocalVideoTrack();
    const divElement = document.querySelector('.video-window');

    if (turnCamera) {
      const videoTrack = await createLocalVideoTrack();
      const enabled = room.localParticipant.isCameraEnabled;
      await room.localParticipant.setCameraEnabled(!enabled);
      await room.localParticipant.publishTrack(videoTrack);
      if (divElement) {
        divElement.appendChild(localVideoTrack.attach());
      }
    } else {
      const enabled = room.localParticipant.isCameraEnabled;
      await room.localParticipant.setCameraEnabled(!enabled);
      localVideoTrack.stop();
      room.localParticipant.unpublishTrack(localVideoTrack);
      if (divElement) {
        divElement.style.display = 'none';
      }
    }
  };

  const shareScreen = async () => {
    setTurnShare(!turnShare);
    const enabled = room.localParticipant.isScreenShareEnabled;
    await room.localParticipant.setScreenShareEnabled(!enabled, {
      audio: true,
    });
  };

  const disconnectRoom = async () => {
    const roomName = localStorage.getItem('roomName');
    await Promise.all([
      room.disconnect(),
      deleteRoom(roomName),
      localStorage.setItem('live', 'false'),
      localStorage.setItem('roomName', ''),
    ]);
  };

  const clickOut = () => {
    navigate('/');
  };

  return (
    <div className="videowindow-wapper">
      <div className="videowindow-container">
        {turnCamera ? (
          <div className="video-window" id="participants-area"></div>
        ) : (
          <nav className="videowindow-avatar">
            <img src={Avatar} alt="" />
          </nav>
        )}
      </div>
      <div className="videowindow-tools">
        <div className="videowindow-tool-button">
          {turnMic ? (
            <div className="videowindow-tool-icon red" onClick={toggleAudio}>
              <img src={icon.offMicIcon} alt="" />
            </div>
          ) : (
            <div className="videowindow-tool-icon gray" onClick={toggleAudio}>
              <img src={icon.onMicIcon} alt="" />
            </div>
          )}
        </div>
        <div className="videowindow-tool-button">
          {turnCamera ? (
            <div className="videowindow-tool-icon red" onClick={toggleVideo}>
              <img alt="" src={icon.offCameraIcon} />
            </div>
          ) : (
            <div className="videowindow-tool-icon gray" onClick={toggleVideo}>
              <img alt="" src={icon.onCameraIcon} />
            </div>
          )}
        </div>
        <div className="videowindow-tool-button">
          <div className="videowindow-tool-icon red">
            <img src={icon.disconnectIcon} onClick={() => setShowModal(true)} />
          </div>
          {showModal && (
            <Popup onClose={closeModal}>
              <DisconnetNoti onClose={closeModal} onDisconnet={disconnectRoom} onOut={clickOut} />
            </Popup>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoWindow;