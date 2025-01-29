import React, { useState } from "react";
import { authLogin } from "../..//lib/services/auth";
import "./Form.css";

interface LoginFormProps {
  onType: () => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onType, onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const data = await authLogin(email, password);
      if (!data.token) {
        setError(data.message || "Sign in failed");
        return;
      }
      // Login success
      setSuccess(true);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.username ? data.username : email);
      setTimeout(() => {
        window.location.reload();
        onClose();
      }, 2000);
    } catch (error: any) {
      console.log(error);
      setError(error ? error : "Sign in failed");
    }
  };

  return (
    <div className="form-wapper">
      <span className="form-title">Log in to ThirstyOasis</span>
      <form className="form-post" id="login" onSubmit={login}>
        <div className="form-main">
          <div className="form-group-main">
            <span className="form-input-title">Username</span>
            <input
              className="form-input-value"
              type="text"
              name="username"
              required
              onInput={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group-main">
            <span className="form-input-title">Password</span>
            <input
              className="form-input-value"
              type="password"
              name="password"
              required
              onInput={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        {error && <p className="form-error-message">{error}</p>}
        {success && <p className="form-success-message">Success!</p>}
        <div className="form-btn">
          <button type="submit" className="form-btn-submit">
            <div className="form-btn-submit-title">Login</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
