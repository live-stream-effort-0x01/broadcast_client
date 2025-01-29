import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Sử dụng react-router-dom thay thế cho solid-start
import icon from "../icon";
import Popup from "../Popup/Popup";
import SignUpForm from "../Form/SignupForm";
import LoginForm from "../Form/LoginForm";
import CreateRoomForm from "../Form/CreateRoomForm";
import "./Drawer.css";

const Drawer = ({ props }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(true);
  const [showRoom, setShowRoom] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setShowModal(false);
  const closeRoom = () => setShowRoom(false);
  const changeType = () => setTypeModal(!typeModal);
  const typeLogin = () => {
    setShowModal(true);
    setTypeModal(false);
  };
  const typeSignup = () => {
    setShowModal(true);
    setTypeModal(true);
  };
  const pressLivestream = () => setShowRoom(true);
  const pressContinue = () => navigate("/chatRoom");
  const logOut = () => {
    localStorage.clear();
    setTimeout(() => window.location.reload(), 1000);
  };

  const lable = props?.props || [];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="drawer-hamburger-menu">
      <div className="drawer-button" onClick={toggleMenu}>
        {!isOpen ? (
          <img src={icon.bars} alt="" className="drawer-button-icon" />
        ) : (
          <img src={icon.barsStagg} alt="" className="drawer-button-icon" />
        )}
      </div>
      {isOpen && (
        <div className="drawer-menu-items">
          {lable.map((item, index) => (
            <React.Fragment key={index}>
              {item?.ac === false ? (
                <div className="drawer-container-ac">
                  <div
                    className="drawer-item-a"
                    onClick={item?.name === "Sign-Up" ? typeSignup : typeLogin}
                  >
                    {item?.name}
                  </div>

                  {/* Modal for Login */}
                  {showModal && !typeModal && (
                    <Popup onClose={closeModal}>
                      <LoginForm onType={changeType} onClose={closeModal} />
                    </Popup>
                  )}
                </div>
              ) : (
                <div className="drawer-container">
                  {item.live ? (
                    <div className="drawer-item">
                      <button className="btn-green" onClick={pressLivestream}>
                        {item?.name}
                      </button>
                      <button className="btn-logout" onClick={logOut}>
                        Logout <img src={icon.logout} alt="" />
                      </button>
                      {showRoom && (
                        <Popup onClose={closeRoom}>
                          <CreateRoomForm onClose={closeRoom} />
                        </Popup>
                      )}
                    </div>
                  ) : (
                    <div className="drawer-item">
                      <button className="btn-yellow" onClick={pressContinue}>
                        {item?.name}
                      </button>
                      <button className="btn-logout" onClick={logOut}>
                        Logout <img src={icon.logout} alt="" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Drawer;
