import React, { useState } from "react";
import { authRegister } from "../../lib/services/auth";
import "./Form.css";

interface SignUpFormProps {
  onType: () => void;
  onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const { onClose, onType } = props;

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [repassword, setRepassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [live, setLive] = useState<boolean>(true);

  const handlePasswordChange = async (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    e.preventDefault();
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
        "Password must meet the following requirements: from 6 to 12 characters, 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character."
      );
    } else {
      setPasswordError(null);
    }
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!passwordError) {
      try {
        const data = await authRegister(email, password);
        if (!data.user_id) {
          setSuccess(false);
          setError(data.message || "Sign up failed");
        } else {
          setSuccess(true);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("userName", email);
          setTimeout(() => {
            window.location.reload();
            onClose();
          }, 2000);
        }
      } catch (error) {
        setError(error.message || "Sign up failed");
      }
    } else {
      setError("Sign up failed");
    }
  };

  return (
    <div className="form-wapper">
      <span className="form-title">Join ThirstyOasis</span>
      <form className="form-post" id="register" onSubmit={register}>
        <div className="form-main">
          <div className="form-group-main">
            <span className="form-input-title">Email</span>
            <input
              className="form-input-value"
              type="email"
              placeholder="Email address"
              name="register-username"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group-main">
            <span className="form-input-title">Password</span>
            <input
              className="form-input-value"
              type="password"
              name="password"
              required
              onChange={(e) => handlePasswordChange(e, e.target.value)}
            />
          </div>

          <div className="form-group-main">
            <span className="form-input-title">Date of Birth</span>
            <div className="form-input-group">
              <input
                className="form-input-value s-1"
                type="month"
                name="month"
                placeholder="month"
                onChange={(e) => handlePasswordChange(e, e.target.value)}
              />
              <input
                className="form-input-value s-2"
                type="text"
                name="day"
                placeholder="day"
                onChange={(e) => handlePasswordChange(e, e.target.value)}
              />
              <input
                className="form-input-value s-2"
                type="text"
                name="year"
                placeholder="year"
                onChange={(e) => handlePasswordChange(e, e.target.value)}
              />
            </div>
          </div>

          <div className="form-group-main">
            <span className="form-input-title">Phone Number</span>
            <div className="form-input-group">
              <input
                className="form-input-value s-1"
                type="text"
                name="countryCode"
                placeholder="Country Code"
                onChange={(e) => handlePasswordChange(e, e.target.value)}
              />
              <input
                className="form-input-value s-3"
                type="text"
                name="number"
                placeholder="Number"
                onChange={(e) => handlePasswordChange(e, e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-sig-aim">
          <button
            onClick={() => setLive(!live)}
            className={`${live ? "form-sig-aim-yep" : ""}`}
          >
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="1em" width="1em">
              <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
            </svg>
            I am a Streamer
          </button>
          <button onClick={() => setLive(!live)} className={`${live ? "" : "form-sig-aim-yep"}`}>
            I am here to have Fun
          </button>
        </div>

        <div className="form-more-sig">
          <p className="form-more-content-black">
            ThirstyOasis may use your phone to call or send text messages with information regarding your account.
          </p>
        </div>

        <div className="form-more-sig">
          <p className="form-more-content-black">
            By clicking Sign Up, you are agreeing to ThirstyOasis's
            <a className="form-more-link-green">Terms of Service</a> and are acknowledging our
            <a className="form-more-link-green">Privacy Notice</a> applies.
          </p>
        </div>

        {passwordError && <p className="form-error-message">{passwordError}</p>}
        {!success && <p className="form-error-message">{error}</p>}
        {success && <p className="form-success-message">Success!</p>}

        <div className="form-btn">
          <button type="submit" id="register-btn" className="form-btn-submit">
            <div className="form-btn-submit-title">Sign Up</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
