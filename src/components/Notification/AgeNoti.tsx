import './Notification.css'
import { Component } from "solid-js";
import { createSignal, Show } from 'solid-js';
import icon from '~/components/icon'; 
interface AgeNotiProps{

  onClose:()=>void;

}

const AgeNoti:  Component<AgeNotiProps>= (props) => {

  const { onClose} = props;
  
  return (
    <div class='noti-wapper'>
      <span class="noti-title">Are you 18+</span>
      <div class='noti-content'>You must be 18 years old and agree to our
      <span class='green'>Terms and Conditions </span>before continuing
      </div>
      <button class='noti-btn bg-green border-green '  onClick={onClose}>I agree</button>
      <button class='noti-btn border-black '>I am not over 18</button>
    </div>

  );
};

export default  AgeNoti