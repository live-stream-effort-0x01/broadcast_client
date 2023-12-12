import './Notification.css'
import { Component } from "solid-js";
import { createSignal, Show } from 'solid-js';
import icon from '~/components/icon'; 
interface DisconnetNotiProps{
  onDisconnet: () => void;
  onClose:()=>void;
  onOut:()=>void

}


const DisconnetNoti: Component<DisconnetNotiProps>= (props) => {
  const [change,setChange]= createSignal<boolean>(false);
  const { onDisconnet,onClose,onOut} = props;
  
  return (
    <div class='noti-wapper'>
      <Show when={change()}
          fallback={
          <>
          <span class="noti-title">Do you want to stop broadcasting?</span> 
        </>
          }>
           <span class="noti-title">Return to the home Page </span>
        </Show>
      
      <div class="noti-btns">
        <Show when={change()}
          fallback={
          <>
          <button class="noti-btn noti-green" onClick={()=>{onDisconnet(),setChange(true)}}>Yes</button>
        <button class="noti-btn noti-red" onClick={onClose}>No</button>
        </>
          }>
          <button class="noti-btn noti-red" onClick={onOut}> <img src={icon.disconnectIcon} /></button>
        </Show>
        
      </div>
    </div>

  );
};

export default  DisconnetNoti