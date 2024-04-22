import { Component, createSignal } from "solid-js";
import NavBar from "~/components/NavBar/NavBar";
import '../components/Account/Account.css'

const Account: Component = () => {

    const [activeItem, setActiveItem] = createSignal(0);

    return (
        <div>
            <NavBar />
            <h2 class="account-title">Account Settings</h2>
            <section class="account-container">
                <div class="account-choices">
                    <ul>
                        <li class={`account-section ${activeItem() === 0 && 'active'}`} onClick={() => setActiveItem(0)}>
                            <h4 class="section-title">Profile Information</h4>
                            {/* Profile information form */}
                        </li>
                        <li class={`account-section ${activeItem() === 1 && 'active'}`} onClick={() => setActiveItem(1)}>
                            <h4 class="section-title">Privacy Settings</h4>
                            {/* Privacy settings form */}
                        </li>
                        <li class={`account-section ${activeItem() === 2 && 'active'}`} onClick={() => setActiveItem(2)}>
                            <h4 class="section-title">Notifications</h4>
                            {/* Notifications settings form */}
                        </li>
                        <li class={`account-section ${activeItem() === 3 && 'active'}`} onClick={() => setActiveItem(3)}>
                            <h4 class="section-title">Security Settings</h4>
                            {/* Security settings form */}
                        </li>
                        {/* Add more sections as needed */}
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default Account;