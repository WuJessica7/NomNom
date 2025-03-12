import "./SignInAndCreateAccPage.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signin">
      <div className="frame">
        <div className="nomnom">Nom Nom</div>
        <div className="signintext">Sign In</div>
        <img className="appicon" alt="" src="App_Icon.svg" />

        <div className="fields">
          <div className="email-field">
            <label htmlFor="email" className="label">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password-field">
            <label htmlFor="password" className="label">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link to="/ingredients">
            <div className="continue-button">
              <div className="continue">Continue</div>
            </div>
          </Link>
        </div>

        <div className="footer">
          <div className="no-acc-text">Don’t have an account?</div>
          <Link to="/create-account">
            <div className="sign-up-button">Sign up</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;