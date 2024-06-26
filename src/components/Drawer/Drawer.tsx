import { createSignal,Show } from "solid-js";
import "./Drawer.css"
import { useNavigate } from "solid-start";
import icon from "../icon";
import Popup from "../Popup/Popup";
import SignUpForm from "../Form/SignupForm";
import LoginForm from "../Form/LoginForm";
import CreateRoomForm from "../Form/CreateRoomForm";
import { Component } from "solid-js";

interface DrawerProps{
props:any
}

const  Drawer: Component <DrawerProps> = (props) =>{
  const navigate = useNavigate();
  const [showModal, setShowModal] = createSignal(false);
  const [typeModal, setTypeShowModal] = createSignal(true);
  const [showRoom, setShowRoom] = createSignal(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const closeRoom = () => {
    setShowRoom(false);
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
  const pressLivestream =()=>{
    setShowRoom(true)
   }
   const pressContinute=()=>{
    navigate('/chatRoom')
   }

   const logOut = ()=>{
    sessionStorage.clear()
    
    setTimeout(() => {
      window.location.reload()
   
    }, 1000);
  }

  const lable: object[] = props?.props
    const [isOpen, setIsOpen] = createSignal(true);

    const toggleMenu = () => {
      setIsOpen(!isOpen());
    };
    return (
      <div class="drawer-hamburger-menu">
        <div class={`drawer-button`} onClick={toggleMenu}>
       {!isOpen()?<img src={icon.bars} alt=''  class='drawer-button-icon'/>:<img src={icon.barsStagg} alt='' class='drawer-button-icon' />
       }
        </div>
        {isOpen() && (
          <div class="drawer-menu-items">
          {lable.map((item:any) => (
           <>{ item?.ac ===false ?
                <div class="drawer-container-ac">
                <div class='drawer-item-a' onClick={item?.name==='Sign-Up'? typeSignup : typeLogin} >{item?.name}</div>
                {showModal() && typeModal() && (
                  <Popup onClose={closeModal}>
                    <SignUpForm onType={changeType} /> 
                  </Popup>
                 )}
                 {showModal() && !typeModal() && (
                  <Popup onClose={closeModal}>
                    <LoginForm onType={changeType} onClose={closeModal}/> 
                  </Popup>
                )}
                </div>  :

                <div class="drawer-container">
                <Show
                when={!item.live}
                fallback={
                <div  class= 'drawer-item ' >
                <button  class='btn-green' onClick={pressLivestream}>{item?.name}</button>
                <button class='btn-logout' onClick={logOut}>Logout  <img src={icon.logout} alt='' /></button>
                {showRoom() &&   (
                <Popup onClose={closeRoom}>
                  <CreateRoomForm onClose={closeRoom}/> 
                </Popup> )}
                </div>

                }
                >
                 <div  class=  'drawer-item' >
                    <button  class='btn-yellow'  onClick={pressContinute }>{item?.name}</button>
                    <button  class='btn-logout' onClick={logOut}>Logout  <img src={icon.logout} alt='' /></button>
                
                </div>
                </Show>
                </div>
            }</>
           ))}
          </div>
        )}
      </div>
    );
}

export default Drawer;