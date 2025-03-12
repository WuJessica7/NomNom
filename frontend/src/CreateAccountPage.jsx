import "./SignInAndCreateAccPage.css"
import { Link } from 'react-router-dom';
import { useState } from 'react';

function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return(
    <div className="signin">
      <div className="frame">
        <div className="nomnom">Nom Nom</div>
        <div className="create-account-text">Create Account</div>
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
            <label htmlFor="password" className="label">Password:</label>
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
          <div className="have-acc-text">Already have an account?</div>
          <Link to="/sign-in">
            <div className="sign-in-button">Sign In</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountPage;