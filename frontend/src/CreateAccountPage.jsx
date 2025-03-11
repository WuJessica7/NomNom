import "./SignInAndCreateAccPage.css"
import { Link } from 'react-router-dom';

function CreateAccountPage() {
    return(
        <div className="signin">
            <div className="frame">
                <div className="nomnom">Nom Nom</div>
                <div className="create-account-text">Create Account</div>
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