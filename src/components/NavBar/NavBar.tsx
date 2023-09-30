import { createSignal, Show } from 'solid-js';

export default function NavBar() {
  return (
    <header>

      <Show
        when={loggedIn()}
        fallback={
          <nav class="navigation">
            <a href="#" class="navigation-element">Login</a>
            <a href="#" class="navigation-element">Sign-Up</a>
          </nav>
        }
      >

        <nav id="inbetween" class="navigation">
          <form action={import.meta.env.VITE_STREAM_URL}>
            <button class="stream-button" type="submit">Start Streaming</button>
          </form>
          <a href="#" class="navigation-element">Username</a>
        </nav>
      </Show>
    </header>
  );
}