import NavBar from '~/components/NavBar/NavBar';
import './styles.css'
import ListCard from '~/components/Listcard/Listcard';
import { getBroadcasts, Broadcasts } from '~/lib/services/broadcasts';
import { useNavigate } from "solid-start";
import {
  createResource,
  createSignal,
  createEffect,
  Show
} from "solid-js";
import { Component } from "solid-js";
import { isLogin } from '~/lib/services/auth';
import Drawer from '~/components/Drawer/Drawer';
import CreateRoomForm from '~/components/Form/CreateRoomForm';
import Popup from '~/components/Popup/Popup';

const Home: Component = () => {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const navigate = useNavigate();
  const [live, setLive] = createSignal(false);
  const [showRoom, setShowRoom] = createSignal(false);
  const [userName, setUserName] = createSignal<any>('');
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);
  const [title, setTitle] = createSignal<any>(true);

  createEffect(() => {
    refetch()
  }, [broadcasts])

  createEffect(() => {
    const move = async () => {
      const title = sessionStorage.getItem('roomName');
      setTitle(title);
    };
    move();
  }, []);

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

  const pressLivestream = () => {
    setShowRoom(true)
  }

  createEffect(() => {
    setLoggedIn(isLogin())
  });

  const pressContinue = () => {
    navigate('/chatRoom')
  }

  const closeRoom = () => {
    setShowRoom(false);
  };



  return (
    <main class='home-warrper' >
      <div class='home-header'><NavBar /></div>  
      {loggedIn() && (
        <div id="inbetween" class="stream-nav">
          <div class="stream-nav-content">
                <Show
                  when={live()}
                  fallback={
                    <>
                      <button onClick={pressLivestream} class={'stream-button green show'} type="submit">Start Stream</button>
                      {showRoom() && (
                        <Popup onClose={closeRoom}>
                          <CreateRoomForm onClose={closeRoom} />
                        </Popup>
                      )}
                    </>
                  }
                >
                  <button onClick={pressContinue} class={"stream-button yellow show"} type="submit">Continue Stream</button>
                </Show>
             
              <div class='header-drawer'>
                <Drawer props={[{ name: live() ? 'Continue Streaming' : 'Start Streaming', link: '#', action: import.meta.env.VITE_STREAM_URL, ac: true, live: true }]} />
              </div>
            <div class='username-card'><p class='username'>{userName() ? userName() : 'UserName'}</p></div>
          </div>
        </div>
      )}

      <div class='home-container'>
      {!loggedIn() && broadcasts()?.length === 0 && (
          <div class="jumbotron">
            <h1 class="jumbotron-header">No rooms created</h1>
            <p class="jumbotron-text">Please login to create a room.</p>
          </div>
      )}
        <div class='home-list'>
          <ListCard />
        </div>
      </div>
    </main>
  );
}

export default Home;
