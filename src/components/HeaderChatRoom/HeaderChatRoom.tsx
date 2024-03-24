import { createSignal, createEffect } from 'solid-js';
import './HeaderChatRoom.css';
import { Component } from "solid-js";
import Back from '~/components/images/back-button.png'

const HeaderChatRoom: Component = () => {
  const [title, setTitle] = createSignal<any>(true);

  // Fetch title from sessionStorage on component mount
  createEffect(() => {
    const move = async () => {
      const title = sessionStorage.getItem('roomName');
      setTitle(title);
    };
    move();
  }, []);

  // Function to navigate to the home page
  const navigateToHome = () => {
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <header class='header-wapper'>
      <nav id="inbetween" class="navigation-livestream between ">
        <div class='back-container'>
          <img src={Back} alt='back' class='back-icon' onClick={navigateToHome} />
          <span class='tooltip'>Return to Home Page</span>
        </div>
        <div class={"navigation-element"}>{title()}</div> {/* Display title */}
        <div class="navigation-element-viewers">Viewers: 0</div>
      </nav>
    </header>
  );
};

export default HeaderChatRoom;
