export default function NavBar() {
    return (
        <header>

        <Show
        when={loggedIn()}
        fallback={            <nav class="navigation">
        <a href="#" class="navigation-element">Login</a>
        <a href="#" class="navigation-element">Sign-Up</a>
    </nav>
    }
      >
        <button onClick={toggle}>Log out</button>
      </Show>
      </header>
    );
}