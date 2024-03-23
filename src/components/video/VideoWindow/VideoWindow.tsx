import { createSignal, Show } from 'solid-js';
import { useNavigate } from "solid-start";
import { deleteRoom } from '~/lib/services/broadcasts';
import Avatar from'~/components/images/img_avatar.png'
import icon from '~/components/icon';
import Popup from '~/components/Popup/Popup';
import DisconnetNoti from '~/components/Notification/DisconnetNoti';
import { Room ,createLocalVideoTrack,createLocalAudioTrack} from "livekit-client";
import './VideoWinow.css'
import { Component } from "solid-js";

interface VideoWindowProps {
    room: Room;
  }
const VideoWindow:Component<VideoWindowProps>= (props)=> {
    const navigate = useNavigate();
    const {room}= props
 
    const [videoElement, setVideoElement] = createSignal<HTMLVideoElement | null>(null);
    const [turnCamera, setTurnCamera] = createSignal(false);
    const [turnShare, setTurnShare] = createSignal(false);
    const [turnMic, setTurnMic] = createSignal(false);
    const [loading, setLoading] = createSignal(false);
    const [showModal, setShowModal] = createSignal(false);
    const closeModal = () => {
        setShowModal(false);
      };
     
    const toggleAudio = () => {
        setTurnMic(!turnMic())
        const turn = async ()=>{
            const enabled = room.localParticipant.isMicrophoneEnabled;
            await room.localParticipant.setMicrophoneEnabled(false);
            const audioTrack = await createLocalAudioTrack({
                echoCancellation: true,
                noiseSuppression: true,
              })
          
            const audioPublication = await room.localParticipant.publishTrack(audioTrack)
        }
       turn()
     
       
      };
     const toggleVideo =  () => {
        setTurnCamera(!turnCamera())
        const turn = async ()=>{
            const localVideoTrack = await createLocalVideoTrack();
     
            const divElement = document.querySelector('.video-window')as HTMLVideoElement;
           
            if(turnCamera()===true){
                const videoTrack = await createLocalVideoTrack()
                const enabled = room.localParticipant.isCameraEnabled;
                await room.localParticipant.setCameraEnabled(!enabled);
                const videoPublication = await room.localParticipant.publishTrack(videoTrack)
                // Gắn video element vào bên trong thẻ div nếu nó tồn tại
                if (divElement) {
                  divElement.appendChild(localVideoTrack.attach());
                } else {
                  console.log("Không tìm thấy thẻ div");
                } 
             
            }
            if(turnCamera()===false){
              
                const enabled = room.localParticipant.isCameraEnabled;
                await room.localParticipant.setCameraEnabled(!enabled);
                localVideoTrack.stop()
                const localParticipant = room.localParticipant;

                // Dừng việc truy cập video track (camera)
                localParticipant.unpublishTrack(localVideoTrack);
                if (divElement) {
                    divElement.style.display = 'none';
                  } else {
                    console.log("Không tìm thấy thẻ div ");
                  } 
            }
        }
        turn()
        
      
      };
 
      const shareScreen =  () => {
        setTurnShare(!turnShare())
     
        const share =async ()=>{
                const enabled = room.localParticipant.isScreenShareEnabled;
                await room.localParticipant.setScreenShareEnabled(!enabled, {
                  audio: true,
                });
        }
        share()
     
      };
    
      const disconnectRoom = async () => {
 
      const roomName = sessionStorage.getItem('roomName')
      await Promise.all([
        room.disconnect(),
        deleteRoom(roomName) ,
        sessionStorage.setItem("live", 'false'),
        sessionStorage.setItem("roomName", ''),
      ]);   
     
      };
      const clickOut =  () => {
      navigate('/')    
        };
    return (
        <div class='videowindow-wapper'>
            <div class='videowindow-container'>
            <Show when={turnCamera()}
            fallback={
                <nav class='videowindow-avatar'>
                    <img src={Avatar} alt=''></img>
                </nav>
            }>
         <div class="video-window" id="participants-area"></div>

            </Show>
            </div>
            <div class='videowindow-tools'>
                <div class='videowindow-tool-button'>
                    <Show when={turnMic()} 
                    fallback={
                        <div class='videowindow-tool-icon gray' onclick={toggleAudio}>
                            <img src={icon.onMicIcon} alt='' />
                            <span class='tooltip'>Turn Off Mic</span>
                        </div>     
                    }>
                        <div class='videowindow-tool-icon red' onclick={toggleAudio}> 
                            <img src={icon.offMicIcon} alt='' />
                            <span class='tooltip'>Turn On Mic</span>
                        </div>
                        
                    </Show>
                </div>
                <div class='videowindow-tool-button'>
                    <Show when={turnCamera()} 
                    fallback={
                        <div class='videowindow-tool-icon gray'  onclick={toggleVideo}>
                              <img alt='on' src={icon.onCameraIcon} />
                              <span class='tooltip'>Turn Off Camera</span>
                        </div>     
                    }>
                        <div class='videowindow-tool-icon red' onclick={toggleVideo}>
                        <img alt='off' src={icon.offCameraIcon} />
                        <span class='tooltip'>Turn On Camera</span>
                        </div>
                        
                    </Show>
                </div>
                {/* <div class='videowindow-tool-button'>
                    <Show when={turnShare()} 
                    fallback={
                    <div class='videowindow-tool-icon gray share-screen'   onclick={shareScreen}>
                        <img src={icon.onScreenIcon} alt=''/>
                    </div>     
                    }>
                     <div class='videowindow-tool-icon red'  onclick={shareScreen}>
                     <img src={icon.offScreenIcon} alt=''/>
                     </div>    
                    </Show>
                </div> */}
                <div class='videowindow-tool-button'>
                    <div class='videowindow-tool-icon red'>
                        <img src={icon.disconnectIcon} onClick={()=> setShowModal(true)} />
                        <span class='tooltip'>End Broadcast</span>
                    </div>  
                    {showModal()  && (
              <Popup onClose={closeModal}>
                 <DisconnetNoti onClose={closeModal} onDisconnet={disconnectRoom} onOut={clickOut} /> 
              </Popup>
            )}      
                </div>
            </div>

        </div>
    );
  }
  export default VideoWindow