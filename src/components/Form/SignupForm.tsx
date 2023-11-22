import { createSignal } from "solid-js";
import { authRegister } from "~/lib/services/auth";
import "./Form.css";
import { Component } from "solid-js";
interface SignUpFormProps{
  onType: () => void;
}
const SignUpForm: Component <SignUpFormProps>= (props) => {
 
  const [username, setUsername] = createSignal<string>("");
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [repassword, setRepassword] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");
  const [success, setSuccess] = createSignal<boolean>(false);
  const { onType} = props;
  const register = async (e:Event) => {
    e.preventDefault()
    setError("");
    try {
      const data = await authRegister(username(), email(), password());

      if (data.error) {
        setSuccess(false);
        setError( data.error||"Sign up failed");

      }else{ 
        setSuccess(true);
        setTimeout(() => {
        onType()
      
        }, 2000);}
    
    } catch (error) {
      setError( "Sign up failed");
    }
  };
  return (
    <div class='form-wapper'>
       <span class="form-title">Sign Up</span>
       <form class="form-post" id="register" onSubmit={register}>
      <div class="form-main">
      <div class="form-group-main">
          <input
            class="form-input-value"
            type="text"
            name="username"
            placeholder="Username"
            onInput={(event) => setUsername(event.target.value)}
          ></input>
        </div>
        <div class="form-group-main">
          <input
            class="form-input-value"
            type="text"
            placeholder="Email address"
            name="register-username"
            required
            onInput={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div class="form-group-main">
          <input
            class="form-input-value"
            type="password"
            name="password"
            placeholder="Password"
            required
            onInput={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        
      </div>
      {!success() && <p class="form-error-message">{error()}</p>}
      {success() && <p class="form-success-message">Success!</p>}
      <div class="form-btn">
        <button
          type="submit"
          id="register-btn"
          class="form-btn-submit"
        
        >
          <div class="form-btn-submit-title">Crete an account</div>
         
        </button>
        <div class="form-more">
            <p class="form-more-content">Already have an account?</p>
            <div class="form-more-link"  onClick={onType} >Login</div>
          </div>
         

      </div>
    </form>
    </div>
   
  );
};


export default SignUpForm;