import { Component, createSignal } from "solid-js";
import NavBar from "~/components/NavBar/NavBar";
import '../components/Account/Account.css';
import Avatar from "../components/images/F-Avatar.png"

const Account: Component = () => {
    const [activeTab, setActiveTab] = createSignal(0);

    const handleTabClick = (index: number, event: MouseEvent) => {
        event.preventDefault();
        setActiveTab(index);
    };

    return (
        <div>
            <NavBar />
            <h2 class="account-title">Account Settings</h2>
            <div class="account-card">
                <section class="account-container">
                    <div class="account-tabs">
                        <a href="#profile-info" class={`tab ${activeTab() === 0 && 'active'}`} onClick={(e) => handleTabClick(0, e)}>
                            <h4 class="tab-title">Profile Information</h4>
                        </a>
                        <a href="#password" class={`tab ${activeTab() === 1 && 'active'}`} onClick={(e) => handleTabClick(1, e)}>
                            <h4 class="tab-title">Password</h4>
                        </a>
                    </div>
                    <div class="account-content">
                        {activeTab() === 0 && (
                            <div id="profile-info" class="tab-content">
                                <div class="avatar-container">
                                    <div class="avatar-box">
                                        <img class="account-avatar" src={Avatar} alt="avatar" />
                                        <label class="upload-label" for="file-input">Update Profile Picture
                                        <input id="file-input" class="upload-btn" type="file" accept="image"/>
                                    </label> &nbsp;
                                    </div>
                                    
                                </div>
                                <form id="profile-form">
                                    <div class="form-group">
                                        <label for="name">Name</label>
                                        <input type="text" id="name" name="name" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" name="email" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="contact">Contact</label>
                                        <input type="tel" id="contact" name="contact" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="bio">Bio</label>
                                        <textarea id="bio" name="bio" rows="4"></textarea>
                                    </div>
                                </form>
                            </div>
                        )}
                        {activeTab() === 1 && (
                            <div id="password" class="tab-content">
                                <p>Change Password Form</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>


            <div class="account-buttons-container">
                <div class="account-buttons">
                    <button class="submit-btn">Submit</button>
                    <button class="cancel-btn">Cancel</button>
                </div>
            </div>

        </div>
    );
};

export default Account;
