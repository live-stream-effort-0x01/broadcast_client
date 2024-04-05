import NavBar from '~/components/NavBar/NavBar';
import PricingPlan from './pricingPlan';
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
import AddTokenForm from '~/components/Form/AddTokenForm';
// import HeaderChatRoom from '~/components/HeaderChatRoom/HeaderChatRoom';

const Home: Component = () => {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const navigate = useNavigate();
  const [live, setLive] = createSignal(false);
  const [showRoom, setShowRoom] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);
  const [typeModal, setTypeShowModal] = createSignal(true);
  const [userName, setUserName] = createSignal<any>('');
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);
  const [recentBroadcasts, setRecentBroadcasts] = createSignal<Broadcasts[]>([]); // Add state for recently broadcasted rooms
  const [title, setTitle] = createSignal<any>(true);
  const [showPricing, setShowPricing] = createSignal(false);

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

  const handleButtonClick = () => {
    navigate('/pricingPlan');
  }

  // (temporary) Fetch and update recently broadcasted rooms
  // createEffect(() => {
  //   const fetchRecentBroadcasts = async () => {
  //     try {
  //       const recentBroadcastsData = await getRecentBroadcasts(); // Define a function to fetch recent broadcasts
  //       setRecentBroadcasts(recentBroadcastsData);
  //     } catch (error) {
  //       console.error("Error fetching recent broadcasts:", error);
  //     }
  //   };
  //   fetchRecentBroadcasts();
  // }, []);

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

  const addToken = () => {
    setShowModal(true)
    setTypeShowModal(false)
  }
  const closeModal = () => {
    setShowModal(false);
  };
  const changeType = () => {
    setTypeShowModal(!typeModal());
  };

  return (
    <main class='home-warrper' >
      <div class='home-header'><NavBar /></div>
      {loggedIn() && (
        <div id="inbetween" class="stream-nav">
          <div class="stream-nav-content">
            <div>
              <div>
                <Show
                  when={live()}
                  fallback={
                    <>
                      <button onClick={pressLivestream} class={'stream-button green show'} type="submit">Start Streaming</button>
                      {showRoom() && (
                        <Popup onClose={closeRoom}>
                          <CreateRoomForm onClose={closeRoom} />
                        </Popup>
                      )}
                    </>
                  }
                >
                  <button onClick={pressContinue} class={"stream-button yellow show"} type="submit">Continue Streaming</button>
                </Show>
              </div>
              <div class='header-drawer'>
                <Drawer props={[{ name: live() ? 'Continue Streaming' : 'Start Streaming', link: '#', action: import.meta.env.VITE_STREAM_URL, ac: true, live: true }]} />
              </div>
            </div>
            <div class='username'>{userName() ? userName() : 'UserName'}</div>
          </div>

        </div>
      )}

      {/* temporary */}
      <div class='subheader-wrapper'>
        <div class='recent-title'>Recently Broadcasted</div>
        <div class='token-balance'>Token Balance</div>
      </div>
      <div class='recent-token-wrapper'>
        <div class='home-recent-container'>
          <div class='home-recent-list'>
            {/* {recentBroadcasts().map((broadcast, index) => ( */}
            <div class="recent-broadcast-card" onclick={pressContinue}> {/* Remove the key prop */}
              {/* <p>Room Name: {broadcast.name}</p> */}
              <p class={"room-name"}>Room Name: {title()}</p>
              {/* <p>Room ID: {broadcast.sid}</p> */}
              
            </div>
            {/* <div class='balance-card'> */}
            <p class='balance'>$10</p>
          {/* </div> */}
            {/* // ))} */}
          </div>
        </div>

      </div>

        <div class='tertiary-wrapper'>
        <div class='home-title'>Recommended for you</div>
        <div class='token-title'></div>
        <div class='token-container'>
          <button class='add-token' onClick={handleButtonClick}>Add Tokens</button>
          {showPricing() && <PricingPlan />}
          {/* {showModal() && !typeModal() && (
            <Popup onClose={closeModal}>
              <AddTokenForm onType={changeType} onClose={closeModal} />
            </Popup>
          )} */}
        </div>
        </div>
     
      <div class='home-container'>
        <div class='home-list'>
          <ListCard />
        </div>
      </div>
    </main>
  );
}

export default Home;
