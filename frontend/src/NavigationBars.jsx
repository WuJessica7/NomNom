import "./NavigationBars.css";
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function NavigationBar({ screen_name }) {
    const { user } = useAuth();
    
    return (
        <div className="navigationBar">
            <div className="screenName">{screen_name}</div>

            <Link to={user ? "/ingredients" : "/"}>
                <img className="appIcon" alt="" src="https://drive.google.com/file/d/1nqTNkOhzC_yycbIrFCBONZR023af--5n/view?usp=sharing" />
                <div className="appName">Nom Nom</div>
            </Link>

            <Link to="/favorites">
                <img className="heartIcon" alt="" src="Heart_Icon.svg" />
            </Link>

            <Link to="/recipes">
                <img className="bookIcon" alt="" src="Book_Icon.svg" />
            </Link>

            <Link to="/ingredients">
                <img className="saltIcon" alt="" src="Salt_Icon.svg" />
            </Link>

            <Link to="/activity">
                <img className="bellIcon" alt="" src="Bell_Icon.svg" />
            </Link>

            <Link to="/profile">
                <img className="userIcon" alt="" src="User_Icon.svg" />
            </Link>
        </div>
    );
}

function MainPageNavigationBar() {
    return (
        <div className="navigationBar">
            <Link to="/">
                <img className="appIcon" alt="" src="https://drive.google.com/file/d/1nqTNkOhzC_yycbIrFCBONZR023af--5n/view?usp=sharing" />
                <div className="appName">Nom Nom</div>
            </Link>

            <Link to="/sign-in">
                <text className="signIn">Sign In</text>
            </Link>
        </div>
    );
}

function OtherNavigationBar({ screen_name }) {
    const { user } = useAuth();
    
    return (
        <div className="navigationBar">
            <div className="screenName">{screen_name}</div>
            <Link to={user ? "/ingredients" : "/"}>
                <img className="appIcon" alt="" src="https://drive.google.com/file/d/1nqTNkOhzC_yycbIrFCBONZR023af--5n/view?usp=sharing" />
                <div className="appName">Nom Nom</div>
            </Link>

            <Link to="/ingredients">
                <text className="back">Back</text>
            </Link>
        </div>
    );
}

export { NavigationBar, MainPageNavigationBar, OtherNavigationBar };