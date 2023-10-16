import { createSignal } from "solid-js";
import "./Drawer.css"
import { FaSolidBars } from 'solid-icons/fa'
import { FaSolidBarsStaggered } from 'solid-icons/fa'
import Popup from "../Popup/Popup";
import SignUpForm from "../Form/SignupForm";
import LoginForm from "../Form/LoginForm";


function Drawer(props:any) {
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
                <form  class= {`drawer-item  ${item?.live ? 'yellow': 'green'}`} action={item?.acton}>
                <button  class={item?.live ? 'yellow': 'green'}  type="submit">{item?.name}</button>
                </form>
            }</>
           ))}
          </div>
        )}
      </div>
    );
}

export default Drawer;