import { createSignal } from "solid-js";
import './Notification.css'

export default function DisconnetNoti (props: {
  onDisconnet: () => void;
  onClose:()=>void;
})  {

  const { onDisconnet,onClose} = props;
  return (
    <div class='noti-wapper'>
      <span class="noti-title">Do you want to stop broadcasting?</span> 
      <div class="noti-btns">
        <button class="noti-btn noti-green" onClick={onDisconnet}>Yes</button>
        <button class="noti-btn noti-red" onClick={onClose}>No</button>
      </div>
    </div>

  );
};

