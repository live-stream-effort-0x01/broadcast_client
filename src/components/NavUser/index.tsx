import React, { useState } from "react";
import "./NavUser.css";

const sampleUserList = [
  {
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "John Doe",
    type: "queue",
    action: "Accept",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "John Doe",
    type: "queue",
    action: "Accept",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "John Doe",
    type: "queue",
    action: "Accept",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "John Doe",
    type: "queue",
    action: "Accept",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "John Doe",
    type: "queue",
    action: "Accept",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "John Doe",
    type: "available",
    action: "Accept",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "John Doe",
    type: "available",
    action: "Accept",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "John Doe",
    type: "available",
    action: "Accept",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "John Doe",
    type: "available",
    action: "Accept",
  },
];

const sampleUserTypeList = [
  {
    title: "Queue",
    key: "queue",
  },
  {
    title: "Available",
    key: "available",
  },
];

const NAV_USER_BTN = {
  privateCall: { title: "Private call", action: "privateCall" },
};

const Divider = ({ title }: { title: string }) => {
  return (
    <div className="divider">
      <div>{title}</div>
    </div>
  );
};

const NavUser: React.FC = () => {
  const [userList, setUserList] = useState(sampleUserList);

  return (
    <div className="nav-user">
      <div className="nav-user__header">
        <div>{NAV_USER_BTN.privateCall.title}</div>
        <label
          className="nav-user__header__label"
          htmlFor={NAV_USER_BTN.privateCall.action}
        >
          <input
            id="s1"
            type="checkbox"
            className="switch"
            name={NAV_USER_BTN.privateCall.action}
          />
        </label>
      </div>
      {sampleUserTypeList.map((userType) => (
        <div className="nav-user__list" key={userType.key}>
          <Divider title={userType.title} />
          <div className="nav-user__list__user">
            {userList.map(
              (user) =>
                user.type === userType.key && (
                  <div className="nav-user__list__user__item" key={user.name}>
                    <img src={user.avatar} alt="avatar" />
                    <div className="nav-user__list__user__item__info">
                      <span>{user.name}</span>
                    </div>
                    <button>{user.action}</button>
                  </div>
                )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavUser;
