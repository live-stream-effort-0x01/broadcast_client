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
      <span class="form-title">Log in to ThirstyOasis</span>
      <form class="form-post" id="login" onSubmit={login}>
        <div class="form-main">
          <div class="form-group-main">
            <span class="form-input-title">Username</span>
            <input
              class="form-input-value"
              type="text"
             
              name="username"
              required
              onInput={(event) => setEmail(event.target.value)} />
            
          </div>
          <div class="form-group-main">
          <span class="form-input-title"> Password</span>
            <input
              class="form-input-value"
              type="password"
              name="password"
             
              required
              onInput={(event) => setPassword(event.target.value)} />
          </div>
        </div>
        {error() && <p class="form-error-message">{error()}</p>}
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