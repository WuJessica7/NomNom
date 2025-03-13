import "./SignInAndCreateAccPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/ingredients');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="signin">
      <div className="frame">
        <div className="nomnom">Nom Nom</div>
        <div className="signintext">Sign In</div>
        <img className="appicon" alt="" src="App_Icon.svg" />

        <form onSubmit={handleSubmit} className="fields">
          <div className="email-field">
            <label htmlFor="email" className="label">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password-field">
            <label htmlFor="password" className="label">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="continue-button">
            <div className="continue">Continue</div>
          </button>
        </form>

        <div className="footer">
          <div className="no-acc-text">Don't have an account?</div>
          <Link to="/create-account">
            <div className="sign-up-button">Sign up</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;