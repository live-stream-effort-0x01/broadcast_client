import { Component } from "solid-js";
import NavBar from "~/components/NavBar/NavBar";

const Account: Component = () => {
    return (
        <div>
            <NavBar />
            <section class="account-container">
                <h1 account-title>Account</h1>
            </section>
        </div>
    )
}

export default Account;