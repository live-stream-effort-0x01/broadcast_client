import React, { useEffect, useState } from 'react';
import NavBar from '.././components/NavBar/NavBar';
import './styles.css';
import NavUser from '.././components/NavUser';
import ListCardI from '.././components/Listcard/ListcardI';
import Slider from '.././components/Slider';
import SliderTag from '.././components/SliderTag';
import AgeNoti from '.././components/Notification/AgeNoti';
import { isLogin } from '.././lib/services/auth';
import { getBroadcasts, Broadcasts } from '.././lib/services/broadcasts';

const Home: React.FC = () => {
  const [broadcasts, setBroadcasts] = useState<Broadcasts[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

  // Fetch broadcasts
  const fetchBroadcasts = async () => {
    const data = await getBroadcasts();
    setBroadcasts(data);
  };

  // Refetch broadcasts whenever needed
  useEffect(() => {
    fetchBroadcasts();
  }, []);

  // Check login state
  useEffect(() => {
    setLoggedIn(isLogin());
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };
console.log('sss')
  return (
    <main className="home-warper">
      <div className="home-header">
        <NavBar />
      </div>
      <div className="home-container">
        {loggedIn && (
          <div className="home-nav-user">
            <NavUser />
          </div>
        )}
        <div
          className={loggedIn ? 'home-main scroll' : 'home-main-full scroll'}
        >
          {!loggedIn && (
            <div className={showModal ? 'home-popup' : ''}>
              {showModal && <AgeNoti onClose={closeModal} />}
            </div>
          )}
          <div className="home-slider">
            <Slider />
          </div>
          <div className="home-slider-tag">
            <SliderTag />
          </div>
          <div className="home-list">
            <ListCardI />
            <ListCardI />
            <ListCardI />
            <ListCardI />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;