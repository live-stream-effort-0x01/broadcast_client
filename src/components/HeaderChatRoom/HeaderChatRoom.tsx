import { createSignal,createEffect } from 'solid-js';
import './HeaderChatRoom.css'
import { Component } from "solid-js";

const HeaderChatRoom:Component=()=> {
  const [title, setTitile] = createSignal<any>(true);

  
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
    </header>
  );
}
export default HeaderChatRoom;