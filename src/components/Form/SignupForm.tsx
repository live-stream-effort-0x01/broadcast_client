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
  const [passwordError, setPasswordError] = createSignal<any>("");
  const [repassword, setRepassword] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");
  const [success, setSuccess] = createSignal<boolean>(false);
  const [live, setLive] = createSignal<boolean>(true);
  const { onType} = props;


  const handlePasswordChange =async  (e:Event,value:any) =>{
    e.preventDefault()
    const newPassword = value;
    setPassword(newPassword);
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[$@#&!]/;

    const hasLowercase = lowercaseRegex.test(newPassword);
    const hasUppercase = uppercaseRegex.test(newPassword);
    const hasDigit = digitRegex.test(newPassword);
    const hasSpecialChar = specialCharRegex.test(newPassword);

    const isLengthValid = newPassword.length >= 6 && newPassword.length <= 12;

    const isValid = isLengthValid && hasLowercase && hasUppercase && hasDigit && hasSpecialChar;

    if (!isValid) {
      setPasswordError(
        "Password must meet the following requirements:from 6 to 12 characters, 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character."
      );
    } else {
      setPasswordError(null);
    }
  }





  const register = async (e:Event) => {
    e.preventDefault()
    setError("");

    if (!passwordError()) {
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
    } else {
      setError( "Sign up failed");
    }
    
  };
  return (
    <div class='form-wapper'>
       <span class="form-title">Join ThirstyOasis</span>
       <form class="form-post" id="register" onSubmit={register}>
      <div class="form-main">
      <div class="form-group-main">
      <span class="form-input-title">Username</span>
          <input
            class="form-input-value"
            type="text"
            name="username"
      
            onInput={(event) => setUsername(event.target.value)}
          ></input>
        </div>
        {/* <div class="form-group-main">
          <input
            class="form-input-value"
            type="text"
            placeholder="Email address"
            name="register-username"
            required
            onInput={(event) => setEmail(event.target.value)}
          ></input>
        </div> */}
        <div class="form-group-main">
        <span class="form-input-title"> Password</span>
          <input
            class="form-input-value"
            type="password"
            name="password"
            required
            onInput={(event) => handlePasswordChange(event,event.target.value)}
          ></input>
        </div>
        
        <div class="form-group-main">
            <span class="form-input-title"> Date of Birth</span>
            <div class="form-input-group">
            <input
                class="form-input-value s-1"
                type="month"
                name="month"
                placeholder="month"
                required
                onInput={(event) => handlePasswordChange(event,event.target.value)}
              ></input>
                <input
                class="form-input-value s-2"
                type="text"
                name="day"
                placeholder="day"
                required
                onInput={(event) => handlePasswordChange(event,event.target.value)}
              ></input>
                  <input
                class="form-input-value s-2"
                type="text"
                name="year"
                placeholder="year"
                required
                onInput={(event) => handlePasswordChange(event,event.target.value)}
              ></input>
            </div>
          
        </div>
        <div class="form-group-main">
            <span class="form-input-title"> Phone Number</span>
            <div class="form-input-group">
            <input
                class="form-input-value s-1"
                type="country code"
                name="month"
                placeholder="Country Code"
                required
                onInput={(event) => handlePasswordChange(event,event.target.value)}
              ></input>
                <input
                class="form-input-value s-3"
                type="text"
                name="number"
                placeholder="Number"
                required
                onInput={(event) => handlePasswordChange(event,event.target.value)}
              ></input>         
            </div>
          
        </div>


      </div>
        <div class='form-sig-aim'>
        <button onClick={()=>setLive(!live())}    class={`${live() && 'form-sig-aim-yep'}`}><svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="1em" width="1em" style="overflow: visible; color: currentcolor;"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg>I am a Streamer</button>
        <button  onClick={()=>setLive(!live())} class={`${live() ?"": 'form-sig-aim-yep'}`}>I am here to have Fun</button>
        </div>
      <div class="form-more-sig">
        <p class="form-more-content-black">ThirstyOasis may your phone to call or send text messages with information regarding your account </p> 
      </div>
      <div class="form-more-sig">
            <p class="form-more-content-black">By clicking Sign Up, you are agreeing to ThirstyOasis's
            <a class="form-more-link-green" >Terms of Service </a>
            and are acknowledging our
            <a class="form-more-link-green"  >Privacy Notice </a>
            applies
            </p>
      </div>
      


      {passwordError() && <p class="form-error-message">{passwordError()}</p>}
      {!success() && <p class="form-error-message">{error()}</p>}
      {success() && <p class="form-success-message">Success!</p>}
      <div class="form-btn">
        <button
          type="submit"
          id="register-btn"
          class="form-btn-submit"
        >
          <div class="form-btn-submit-title">Sign Up</div>   
        </button>
      </div>
    </form>
    </div>
  );
};


export default SignUpForm;