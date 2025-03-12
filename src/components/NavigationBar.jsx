import { Link } from "react-router-dom";
import "../styles/NavigationBar.scss";

function NavigationBar({ screen_name }) {
    return (
        <div className="navigationBar"> 
            <Link to="/">
                <img className="appIcon" alt="App Icon" src="App_Icon.png" />
                <div className="appName">Nom Nom</div>
            </Link>

            <div className="screenName">{screen_name}</div>

            <div className="icons">
                <Link to="/profile">
                    <img className="userIcon" alt="User Icon" src="User_Icon.svg" />
                </Link>

                <Link to="/activity">
                    <img className="bellIcon" alt="Bell Icon" src="Bell_Icon.svg" />
                </Link>

                <Link to="/ingredients">
                    <img className="saltIcon" alt="Salt Icon" src="Salt_Icon.svg" />
                </Link>

                <Link to="/recipes">
                    <img className="bookIcon" alt="Book Icon" src="Book_Icon.svg" />
                </Link>

                <Link to="/favorites">
                    <img className="heartIcon" alt="Heart Icon" src="Heart_Icon.svg" />
                </Link>
            </div>
        </div>
    );
}

export default NavigationBar;