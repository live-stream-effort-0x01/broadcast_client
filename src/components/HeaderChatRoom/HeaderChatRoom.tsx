import { createSignal, Show } from 'solid-js';

import Drawer from '../Drawer/Drawer';
import './HeaderChatRoom.css'

export default function HeaderChatRoom() {

  const [loggedIn, setLoggedIn] = createSignal(true);
  const [live, setLive] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);
  const [typeModal, setTypeShowModal] = createSignal(true);
  const closeModal = () => {
    setShowModal(false);
  };
  const changeType = () => {
    setTypeShowModal(!typeModal());
  };
  const typeLogin = ()=>{
    setShowModal(true)
    setTypeShowModal(false)
  }
  const typeSignup = ()=>{
    setShowModal(true)
    setTypeShowModal(true)
  }
 

  return (
    <header class='header-wapper'>
        <nav id="inbetween" class="navigation-livestream between ">
        {/* <div >  
          <div 
          // action={import.meta.env.VITE_STREAM_URL}
          >
            <div class={'stream-title show' }>Stream Title</div>
          </div>
          <div class='header-drawer'>
            <Drawer props={[{name:live()?'Continute Streaming':'Start Streaming',link:'#',action:import.meta.env.VITE_STREAM_URL, ac:true,live:true}]}/>       
          </div>
        </div> */}
        <div class={"navigation-element" }>Stream Title</div>
          <div  class="navigation-element">Viewers: 0</div>
        </nav>
    

     
      <div class='header-line'></div>
    </header>
  );
}