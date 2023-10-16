import { createSignal, Show } from 'solid-js';
import Drawer from '../Drawer/Drawer';
import './NavBar.css'
export default function NavBar() {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [live, setLive] = createSignal(true);
  return (
    <header class='header-wapper'>
     
      <Show
        when={loggedIn()}
        fallback={
     
          <nav class="navigation flex-end ">
            <a href="#" class="navigation-element show">Sign-Up</a>
            <a href="#" class="navigation-element show">Login</a>
            <div class='header-drawer'>
            <Drawer props={[{name:'Sign-Up',link:'#',ac:false},{name:'Login',link:'#',ac:false}]}/>       
          </div>
          </nav>
    
       
        }
      >

        <nav id="inbetween" class="navigation between ">
        <div >  
          <form action={import.meta.env.VITE_STREAM_URL}>
            <button class={live()? "stream-button yellow show":'stream-button green show' }type="submit">{live() ? 'Continute Streaming':'Start Streaming'}</button>
          </form>
          <div class='header-drawer'>
            <Drawer props={[{name:live()?'Continute Streaming':'Start Streaming',link:'#',action:import.meta.env.VITE_STREAM_URL, ac:true,live:true}]}/>       
          </div>
        </div>
          <a href="#" class="navigation-element">Username</a>
        </nav>
      </Show>

     
      <div class='header-line'></div>
    </header>
  );
}