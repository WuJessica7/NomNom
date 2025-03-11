import "./SignInAndCreateAccPage.css"
import { Link } from 'react-router-dom';

function SignInPage() {
    return(
        <div className="signin">
            <div className="frame">
                <div className="nomnom">Nom Nom</div>
                <div className="signintext">Sign In</div>
                <img className="appicon" alt="" src="App_Icon.svg" />

                <div className="fields">
                    <div className="email-field">
                        <div className="label">Email</div>
                    </div>

                    <div className="password-field">
                        <div className="label">Password</div>
                    </div>

                    <div className="continue-button">
                        <div className="continue">Continue</div>
                    </div>
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