import { createSignal, Show } from 'solid-js';
import Avatar from'~/components/images/img_avatar.png'
import icon from '~/components/icon';


import { Room ,createLocalVideoTrack,createLocalAudioTrack} from "livekit-client";
import './VideoWinow.css'
interface VideoWindowProps {
    room: Room;
  }
export default function VideoWindow({ room}: VideoWindowProps) {
    const [videoElement, setVideoElement] = createSignal<HTMLVideoElement | null>(null);
    const [turnCamera, setTurnCamera] = createSignal(false);
    const [turnShare, setTurnShare] = createSignal(false);
    const [turnMic, setTurnMic] = createSignal(false);

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
                  console.error("Không tìm thấy thẻ div với class là 'huy'");
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
                    console.error("Không tìm thấy thẻ div với class là 'huy'");
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
        await room.disconnect();
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
                        </div>     
                    }>
                        <div class='videowindow-tool-icon red' onclick={toggleAudio}> 
                            <img src={icon.offMicIcon} alt='' />
                        </div>
                        
                    </Show>
                </div>
                <div class='videowindow-tool-button'>
                    <Show when={turnCamera()} 
                    fallback={
                        <div class='videowindow-tool-icon gray'  onclick={toggleVideo}>
                              <img alt='' src={icon.onCameraIcon} />
                        </div>     
                    }>
                        <div class='videowindow-tool-icon red' onclick={toggleVideo}>
                        <img alt='' src={icon.offCameraIcon} />
                        </div>
                        
                    </Show>
                </div>
                <div class='videowindow-tool-button'>
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
                </div>
                <div class='videowindow-tool-button'>
                    <div class='videowindow-tool-icon red'>
                        <img src={icon.disconnectIcon} onClick={disconnectRoom} />
                    </div>          
                </div>
            </div>

        </div>
    );
  }