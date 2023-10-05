import { createSignal, Show } from 'solid-js';
import './NavBar.css'
export default function NavBar() {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [live, setLive] = createSignal(true);
  return (
    <header class='header-wapper'>
     
      <Show
        when={loggedIn()}
        fallback={
          <nav class="navigation flex-end">
            <a href="#" class="navigation-element">Sign-Up</a>
            <a href="#" class="navigation-element">Login</a>
          </nav>
        }
      >

        <nav id="inbetween" class="navigation between ">
          <form action={import.meta.env.VITE_STREAM_URL}>
            <button class={live()? "stream-button yellow ":'stream-button green' }type="submit">{live() ? 'Continute Streaming':'Start Streaming'}</button>
          </form>
          <a href="#" class="navigation-element">Username</a>
        </nav>
      </Show>

     
      <div class='header-line'></div>
    </header>
  );
}