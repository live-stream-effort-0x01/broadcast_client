import { createSignal,Show } from "solid-js";
import "./Drawer.css"
import { useNavigate } from "solid-start";
import { FaSolidBars } from 'solid-icons/fa'
import { FaSolidBarsStaggered } from 'solid-icons/fa'
import Popup from "../Popup/Popup";
import SignUpForm from "../Form/SignupForm";
import LoginForm from "../Form/LoginForm";
import CreateRoomForm from "../Form/CreateRoomForm";


function Drawer(props:any) {
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

                <Show
                when={!item.live }
                fallback={

                <div  class= 'drawer-item yellow' >
                <button  class='yellow' onClick={pressContinute}>{item?.name}</button>
              
                </div>

                }
                >
                 <div  class=  'drawer-item  green' >
                <button  class= 'green'  onClick={pressLivestream}>{item?.name}</button>
                {showRoom() &&   (
                <Popup onClose={closeRoom}>
                  <CreateRoomForm onClose={closeRoom}/> 
                </Popup> )}
                </div>
                </Show>
             
            }</>
           ))}
          </div>
        )}
      </div>
    );
}

export default Drawer;