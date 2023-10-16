import { createSignal, Show } from 'solid-js';
import Drawer from '../Drawer/Drawer';
import './NavBar.css'
import Popup from '../Popup/Popup';
import SignUpForm from '../Form/SignupForm';
import LoginForm from '../Form/LoginForm';
export default function NavBar() {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [live, setLive] = createSignal(true);
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