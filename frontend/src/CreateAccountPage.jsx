import "./SignInAndCreateAccPage.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';

function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const result = await register(username, email, password);
    if (result.success) {
      navigate('/ingredients');
    } else {
      setError(result.message || 'Registration failed');
    }
  };

  return(
    <div className="signin">
      <div className="frame">
        <div className="nomnom">Nom Nom</div>
        <div className="create-account-text">Create Account</div>
        <img className="appicon" alt="" src="App_Icon.svg" />

        <form onSubmit={handleSubmit} className="fields">
          <div className="username-field">
            <label htmlFor="username" className="label">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
            />
          </div>

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
            <label htmlFor="password" className="label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="continue-button">
            <div className="continue">Continue</div>
          </button>
        </form>

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