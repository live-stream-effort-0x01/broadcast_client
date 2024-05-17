import { createSignal } from "solid-js";
import "./NavUser.css";
import { Component } from "solid-js";

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

const Divider: Component<{ title: string }> = (props) => {
    return (
        <div class="divider">
            <div>{props.title}</div>
        </div>
    );
};

const NavUser: Component = () => {
    const [user, setUser] = createSignal(sampleUserList);

    return (
        <div class="nav-user">
            <div class="nav-user__header">
                <div>{NAV_USER_BTN.privateCall.title}</div>
                <label
                    class="nav-user__header__label"
                    for={NAV_USER_BTN.privateCall.action}
                >
                     <input id="s1" type="checkbox" class="switch" name={NAV_USER_BTN.privateCall.action}></input>
                 
                </label>
            </div>
            {sampleUserTypeList.map((userType) => (
                <div class="nav-user__list">
                    <Divider title={userType.title} />
                    <div class="nav-user__list__user">
                        {user().map((user) =>
                            user.type !== userType.key ? null : (
                                <div class="nav-user__list__user__item">
                                    <img src={user.avatar} alt="avatar" />
                                    <div class="nav-user__list__user__item__info">
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
