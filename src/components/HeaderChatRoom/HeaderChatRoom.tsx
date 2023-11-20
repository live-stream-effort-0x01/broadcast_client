import { createSignal, Show,createEffect } from 'solid-js';

import Drawer from '../Drawer/Drawer';
import './HeaderChatRoom.css'

export default function HeaderChatRoom() {
  const [title, setTitile] = createSignal<any>(true);
  const [typeModal, setTypeShowModal] = createSignal(true);
  createEffect(()=>{
     const move = async ()=>{
      const title =  sessionStorage.getItem('roomName')
      setTitile(title)
     }
     move()
  },[])
  return (
    <header class='header-wapper'>
        <nav id="inbetween" class="navigation-livestream between ">
        <div class={"navigation-element" }>{title()}</div>
          <div  class="navigation-element">Viewers: 0</div>
        </nav>
    

     
      <div class='header-line'></div>
    </header>
  );
}