import { createSignal, Show,createEffect } from 'solid-js';
import { useNavigate } from "solid-start";
import Drawer from '../Drawer/Drawer';
import './NarBar.css'
import Popup from '../Popup/Popup';
import SignUpForm from '../Form/SignupForm';
import CreateRoomForm from '../Form/CreateRoomForm';
import LoginForm from '../Form/LoginForm';
import { isLogin } from '~/lib/services/auth';
import { Component } from "solid-js";
import icon from '../icon';

const NavBar :Component=()=> {


  const navigate = useNavigate();
  const [userName, setUserName] = createSignal<any>('');
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [live, setLive] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);
  const [showRoom, setShowRoom] = createSignal(false);
  const [typeModal, setTypeShowModal] = createSignal(true);
  const [isDropdownOpen, setDropdownOpen] = createSignal(false);
  createEffect(()=>{
    const status = async ()=>{
      const value = sessionStorage.getItem('live')
      if(value==='true'){
        setLive(true)
      }
      else{
        setLive(false)
      }
    }
    status()
  },[])
 createEffect(()=>{
   const name = sessionStorage.getItem("userName")
      setUserName(name)
  },[])
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
  const pressContinute=()=>{
    navigate('/chatRoom')
   }


   const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen());
  };

  const logOut = ()=>{
    sessionStorage.clear()
    
    setTimeout(() => {
      window.location.reload()
   
    }, 1000);
  }
  return (
<header class='header-wapper'>
            <div class=" header-left ">
            <div class='header-logo'>
            <span class='logo-left'>Thirsty</span>
            <span class='logo-right'>Oasis</span>
            </div>
            <ul class="header-list-nav">
              <li class='header-nav'>Browse</li>
              <li class='header-nav'>Private Calls</li>
              <li class='header-nav'>Following</li>
            </ul>
            
            </div>
            <div class=" header-right "> 
            <Show
                      when={loggedIn()}
                      fallback={
                        <nav class="navigation flex-end">
                          <div onClick={typeLogin} class="navigation-element show nav-log">Login</div>
                            {showModal() && !typeModal() && (
                              <Popup onClose={closeModal} buttonClose={true}>
                              <LoginForm onType={changeType} onClose={closeModal}/> 
                              </Popup>
                            )}
                          <div  class="navigation-element show nav-sig" onClick={typeSignup}>Sign-Up</div>
                          {showModal() && typeModal() && (
                            <Popup onClose={closeModal} buttonClose={true}>
                                <SignUpForm onType={changeType}  /> 
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
                        <div>
                          <Show 
                          when={live()}
                          fallback={
                            <>
                            <button onClick={pressLivestream} class={'stream-button green show' }type="submit">Start Streaming</button>
                            {showRoom() &&  (
                              <Popup onClose={closeRoom} buttonClose={true}>
                                <CreateRoomForm onClose={closeRoom}/> 
                              </Popup> )}
                            </>
                          }
                          >
                              <button onClick={pressContinute} class={ "stream-button yellow show" }type="submit">Continute Streaming</button>
                          </Show>
                          
                        </div>
                        <div class='header-drawer'>
                          <Drawer props={[{name:live()?'Continute Streaming':'Start Streaming',link:'#',action:import.meta.env.VITE_STREAM_URL, ac:true,live:true}]}/>       
                        </div>
                      </div>
                        <button class="navigation-element header-username"  onClick={toggleDropdown}>{userName()?userName():'UserName'}</button>
                        {isDropdownOpen() && (
                      <div class='header-option' onClick={logOut}>
                        <span>Logout</span>
                        <img src={icon.logout} alt='' />
                      </div>
                    )}
                      </nav> 
          </Show>
            </div>
            
    
    </header>
  );
}
export default NavBar