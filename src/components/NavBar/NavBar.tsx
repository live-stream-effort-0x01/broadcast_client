import { createSignal, Show, createEffect } from 'solid-js';
import { useNavigate } from "solid-start";
import Drawer from '../Drawer/Drawer';
import './NavBar.css'
import Popup from '../Popup/Popup';
import SignUpForm from '../Form/SignupForm';
import LoginForm from '../Form/LoginForm';
import { isLogin } from '~/lib/services/auth';
import { Component } from "solid-js";
import icon from '../icon';
import Logo from '../images/TO-Logo.png'
import Avatar from '../images/F-Avatar.png'

const NavBar: Component = () => {


  const navigate = useNavigate();
  const [userName, setUserName] = createSignal<any>('');
  const [activeLink, setActiveLink] = createSignal('');
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [live, setLive] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);
  const [showRoom, setShowRoom] = createSignal(false);
  const [typeModal, setTypeShowModal] = createSignal(true);
  const [isDropdownOpen, setDropdownOpen] = createSignal(false);
  createEffect(() => {
    const status = async () => {
      const value = sessionStorage.getItem('live')
      if (value === 'true') {
        setLive(true)
      }
      else {
        setLive(false)
      }
    }
    status()
  }, [])
  createEffect(() => {
    const name = sessionStorage.getItem("userName")
    setUserName(name)
  }, [])
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
  const typeLogin = () => {
    setShowModal(true)
    setTypeShowModal(false)
  }
  const typeSignup = () => {
    setShowModal(true)
    setTypeShowModal(true)
  }
  const pressLivestream = () => {
    setShowRoom(true)
  }
  const pressContinute = () => {
    navigate('/chatRoom')
  }


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen());
  };

  const logOut = () => {
    sessionStorage.clear()

    setTimeout(() => {
      window.location.reload()

    }, 1000);
  }

  const handleNavLinkClick = (link: string) => {
    setActiveLink(link);
  };


  return (
    // <header class='header-wapper'>

    <Show
      when={loggedIn()}
      fallback={

        <nav class="navigation flex-end ">
          <img class='logo' src={Logo} alt='logo' />
          <div class='nav-links'>
            <a href="/" class={`home-link ${activeLink() === '/' ? 'active' : ''}`} onClick={() => handleNavLinkClick('/')}>Home</a>
            <a href="/chatRoom" class={`chat-link ${activeLink() === '/chatRoom' ? 'active' : ''}`} onClick={() => handleNavLinkClick('/chatRoom')}>Rooms</a>
            <a href="/pricingPlan" class={`pricing-link ${activeLink() === '/pricingPlan' ? 'active' : ''}`} onClick={() => handleNavLinkClick('/pricingPlan')}>Payment</a>
          </div>
          <div class="navigation-buttons">
            <div class="signup-btn show" onClick={typeSignup}>Sign Up</div>
            {showModal() && typeModal() && (
              <Popup onClose={closeModal}>
                <SignUpForm onType={changeType} />
              </Popup>
            )}
            <div onClick={typeLogin} class="login-btn show">Login</div>
            {showModal() && !typeModal() && (
              <Popup onClose={closeModal}>
                <LoginForm onType={changeType} onClose={closeModal} />
              </Popup>
            )}
          </div>
          <div class='header-drawer'>
            <Drawer props={[{ name: 'Sign-Up', link: '#', ac: false }, { name: 'Login', link: '#', ac: false }]} />
          </div>
        </nav>


      }
    >
      <div class='header-drawer'>
        <Drawer props={[{ name: 'Sign-Up', link: '#', ac: false }, { name: 'Login', link: '#', ac: false }]} />
      </div>
      <nav class="navigation-login ">
        <img class='logo1' src={Logo} alt='logo' />
        <img class='avatar' src={Avatar} alt='avatar' onClick={toggleDropdown} />
        {isDropdownOpen() && (
          <div class='header-option' onClick={logOut}>
            <img class='logout-icon' src={icon.logout} alt='' />
            <span>Logout</span>
          </div>
        )}
      </nav>
      {/* <nav id="inbetween" class="navigation between ">
          <div >
            <div>
              <Show
                when={live()}
                fallback={
                  <>
                    <button onClick={pressLivestream} class={'stream-button green show'} type="submit">Start Streaming</button>
                    {showRoom() && (
                      <Popup onClose={closeRoom}>
                        <CreateRoomForm onClose={closeRoom} />
                      </Popup>)}
                  </>
                }
              >
                <button onClick={pressContinute} class={"stream-button yellow show"} type="submit">Continute Streaming</button>
              </Show>

            </div>
            <div class='header-drawer'>
              <Drawer props={[{ name: live() ? 'Continute Streaming' : 'Start Streaming', link: '#', action: import.meta.env.VITE_STREAM_URL, ac: true, live: true }]} />
            </div>
          </div>
          <button class="navigation-element header-username" onClick={toggleDropdown}>{userName() ? userName() : 'UserName'}</button>
          {isDropdownOpen() && (
            <div class='header-option' onClick={logOut}>
              <span>Logout</span>
              <img src={icon.logout} alt='' />
            </div>
          )}
        </nav> */}
    </Show>


    // <div class='header-line'></div>
    // </header>
  );
}
export default NavBar