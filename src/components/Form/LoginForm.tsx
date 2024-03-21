import { createSignal } from "solid-js";

import { authLogin } from "~/lib/services/auth";
import { Component } from "solid-js";

interface LoginFormProps {
  onType: () => void;
  onClose:()=>void;
}

const LoginForm :Component<LoginFormProps> = (props) => {
  
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");
  const [success, setSuccess] = createSignal<boolean>(false);
  const { onType,onClose} = props;



  const login = async (e:Event) => {
    e.preventDefault()
    setError("");
    setSuccess(false);
    try {
      const data = await authLogin(email(), password());
      if (!data.token) {
        setError(data.error|| "Sign in failed");
        return;
      }
      // Login success
      setSuccess(true);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userName", data.username ? data.username:email());
      setTimeout(() => {
        window.location.reload()
      onClose()
      }, 2000);
    } catch (error) {
      setError("Sign in failed");
    }
  };
  return (
    <div class='form-wapper'>
      <span class="form-title">Login</span>
      <form class="form-post" id="login" onSubmit={login}>
        <div class="form-main">
          <div class="form-group-main">
            <input
              class="form-input-value"
              type="text"
              placeholder="Email address"
              name="username"
              required
              onInput={(event) => setEmail(event.target.value)} />
            
          </div>
          <div class="form-group-main">
            <input
              class="form-input-value"
              type="password"
              name="password"
              placeholder="Password"
              required
              onInput={(event) => setPassword(event.target.value)} />
          </div>
        </div>
        <div class={`form-error-message ${error() ? 'active' : ''}`}>{error()}</div>

        {success() && <p class="form-success-message">Success!</p>}
        <div class="form-btn">
          <button type="submit"  class="form-btn-submit" 
          >
            <div class="form-btn-submit-title"  >Login</div>
          </button>

          <div class="form-more">
            <p class="form-more-content">Don't have an account?</p>
            <div class="form-more-link" onClick={onType} >Sign Up</div>
          </div>
        </div>
      </form>

    </div>

  );
};

export default LoginForm;