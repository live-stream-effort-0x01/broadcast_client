import { createSignal } from "solid-js";
import "./Drawer.css"
import { FaSolidBars } from 'solid-icons/fa'
import { FaSolidBarsStaggered } from 'solid-icons/fa'
import Popup from "../Popup/Popup";
import SignUpForm from "../Form/SignupForm";
import LoginForm from "../Form/LoginForm";
import CreateRoomForm from "../Form/CreateRoomForm";


function Drawer(props:any) {
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
 

  const lable: object[] = props?.props
    const [isOpen, setIsOpen] = createSignal(true);

    const toggleMenu = () => {
      setIsOpen(!isOpen());
    };
    return (
      <div class="drawer-hamburger-menu">
        <div class={`drawer-button`} onClick={toggleMenu}>
       {!isOpen()?<FaSolidBars />:<FaSolidBarsStaggered />
       }
        </div>
        {isOpen() && (
          <div class="drawer-menu-items">
          {lable.map((item:any, index) => (
           <>
           { 
                item?.ac ===false ?
                <>
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
                </>
                :
                <div  class= {`drawer-item  ${item?.live ?  'green':'yellow'}`} >
                <button  class={item?.live ?  'green':'yellow'}  onClick={()=>setShowRoom(true)}>{item?.name}</button>
                {showRoom() &&   (
                <Popup onClose={closeRoom}>
                  <CreateRoomForm onClose={closeRoom}/> 
                </Popup> )}
                </div>
            }</>
           ))}
          </div>
        )}
      </div>
    );
}

export default Drawer;