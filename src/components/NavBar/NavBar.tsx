import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // React Router
import Drawer from '../Drawer/Drawer';
import Popup from '../Popup/Popup';
import SignUpForm from '../Form/SignupForm';
import CreateRoomForm from '../Form/CreateRoomForm';
import LoginForm from '../Form/LoginForm';
import { isLogin } from '../../lib/services/auth'
import './NarBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [isSignupModal, setIsSignupModal] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Kiểm tra trạng thái live từ localStorage
  useEffect(() => {
    const liveStatus = localStorage.getItem("live") === "true";
    setIsStreaming(liveStatus);
  }, []);

  // Kiểm tra tên người dùng từ localStorage
  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    setLoggedIn(isLogin());
  }, []);

  const closeModal = () => setShowModal(false);
  const closeRoom = () => setShowRoom(false);
  const toggleModalType = () => setIsSignupModal(!isSignupModal());

  const startStreaming = () => setShowRoom(true);
  const continueStreaming = () => navigate("/chatRoom");

  const logOut = () => {
    localStorage.clear();
    setTimeout(() => window.location.reload(), 1000);
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen());

  return (
    <header className="header-wrapper">
      <div className="header-left">
        <div className="header-logo">
          <span className="logo-left">Thirsty</span>
          <span className="logo-right">Oasis</span>
        </div>
        <ul className="header-list-nav">
          <li className="header-nav">Browse</li>
          <li className="header-nav">Private Calls</li>
          <li className="header-nav">Following</li>
        </ul>
      </div>
      <div className="header-right">
        {loggedIn ? (
          <nav className="navigation between">
            <div>
              {isStreaming ? (
                <button
                  onClick={continueStreaming}
                  className="stream-button yellow show"
                  type="button"
                >
                  Continue Streaming
                </button>
              ) : (
                <>
                  <button
                    onClick={startStreaming}
                    className="stream-button green show"
                    type="button"
                  >
                    Start Streaming
                  </button>
                  {showRoom && (
                    <Popup onClose={closeRoom} buttonClose={true}>
                      <CreateRoomForm onClose={closeRoom} />
                    </Popup>
                  )}
                </>
              )}
            </div>
            <div className="header-drawer">
              <Drawer
                props={[
                  {
                    name: isStreaming ? "Continue Streaming" : "Start Streaming",
                    link: "#",
                    action: import.meta.env.VITE_STREAM_URL,
                    ac: true,
                    live: true,
                  },
                ]}
              />
            </div>
            <button
              className="navigation-element header-username"
              onClick={toggleDropdown}
            >
              {userName || 'UserName'}
            </button>
            {isDropdownOpen && (
              <div className="header-option" onClick={logOut}>
                <span>Logout</span>
              </div>
            )}
          </nav>
        ) : (
          <nav className="navigation flex-end">
            {showModal && !isSignupModal && (
              <Popup onClose={closeModal} buttonClose={true}>
                <LoginForm onType={toggleModalType} onClose={closeModal} />
              </Popup>
            )}
            <div
              className="navigation-element show nav-sig"
              onClick={() => {
                setShowModal(true);
                setIsSignupModal(true);
              }}
            >
              Sign-Up
            </div>
            {showModal && isSignupModal && (
              <Popup onClose={closeModal} buttonClose={true}>
                <SignUpForm onType={toggleModalType} />
              </Popup>
            )}
            <div className="header-drawer">
              <Drawer props={[{ name: 'Sign-Up', link: '#', ac: false }]} />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavBar;
