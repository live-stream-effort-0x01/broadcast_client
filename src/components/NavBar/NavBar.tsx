import { createSignal, Show,createEffect } from 'solid-js';
import { useNavigate } from "solid-start";
import Drawer from '../Drawer/Drawer';
import './NarBar.css'
import Popup from '../Popup/Popup';
import SignUpForm from '../Form/SignupForm';
import CreateRoomForm from '../Form/CreateRoomForm';
import LoginForm from '../Form/LoginForm';
import { isLogin } from '~/lib/services/auth';
export default function NavBar() {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [live, setLive] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);
  const [showRoom, setShowRoom] = createSignal(false);
  const [typeModal, setTypeShowModal] = createSignal(true);
  const closeModal = () => {
    setShowModal(false);
  };
  const closeRoom = () => {
    setShowRoom(false);
  };
  createEffect(() => {
  
    setLoggedIn(isLogin())
  },);
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
  const pressLivestream =()=>{
   setShowRoom(true)
  }

  return (
    <header class='header-wapper'>
     
      <Show
        when={loggedIn()}
        fallback={
     
          <nav class="navigation flex-end ">
            <div  class="navigation-element show" onClick={typeSignup}>Sign-Up</div>
            {showModal() && typeModal() && (
              <Popup onClose={closeModal}>
                 <SignUpForm onType={changeType}  /> 
              </Popup>
            )}
            <div onClick={typeLogin} class="navigation-element show">Login</div>
            {showModal() && !typeModal() && (
              <Popup onClose={closeModal}>
                 <LoginForm onType={changeType} onClose={closeModal}/> 
              </Popup>
      )}
            <div class='header-drawer'>
            <Drawer props={[{name:'Sign-Up',link:'#',ac:false},{name:'Login',link:'#',ac:false}]}/>       
          </div>
          </nav>
    
       
        }
      >

        <nav id="inbetween" class="navigation between ">
        <div >  
          <div 
          // action={import.meta.env.VITE_STREAM_URL}
          >
            <Show 
            when={live()}
            fallback={
              <>
              <button onClick={pressLivestream} class={'stream-button green show' }type="submit">Start Streaming</button>
              {showRoom() &&  (
                <Popup onClose={closeRoom}>
                  <CreateRoomForm onClose={closeRoom}/> 
                </Popup> )}
              </>
            }
            >
                <button onClick={pressLivestream} class={ "stream-button yellow show" }type="submit">Continute Streaming</button>
             
            </Show>
            
          </div>
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