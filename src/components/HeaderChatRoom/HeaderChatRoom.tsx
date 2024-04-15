import { createSignal, createEffect, createResource } from 'solid-js';
import './HeaderChatRoom.css';
import { Component } from "solid-js";
import { getBroadcasts, Broadcasts } from '~/lib/services/broadcasts';
import { isLogin } from "~/lib/services/auth";
import Back from '~/components/images/back-button.png'
import NavBar from "~/components/NavBar/NavBar";


const HeaderChatRoom: Component = () => {
  const [title, setTitle] = createSignal<any>(true);
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);

  // Fetch title from sessionStorage on component mount
  createEffect(() => {
    const move = async () => {
      const title = sessionStorage.getItem('roomName');
      setTitle(title);
    };
    move();
  }, []);

  // Effect to track login status
  createEffect(() => {
    setLoggedIn(isLogin());
  });

  // Function to navigate to the home page
  const navigateToHome = () => {
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <div>
      <NavBar />
      <header class='header-wapper'>
        <nav id="inbetween" class="navigation-livestream between ">
          {loggedIn() && ( // Conditionally render back button and viewers if logged in
            <div class='back-container'>
              <img src={Back} alt='back' class='back-icon' onClick={navigateToHome} />
              <span class='b-tooltip'>Return to Home Page</span>
            </div>
          )}
          <div class={"navigation-element"}>{title()}</div>
          {loggedIn() && ( // Conditionally render viewers if logged in
            <div class="navigation-element-viewers">Viewers: 0</div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default HeaderChatRoom;
