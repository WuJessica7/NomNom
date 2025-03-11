import "../styles/NavigationBar.scss";

function NavigationBar({ screen_name }) {
    return(
        <div className="navigationBar"> 
            <img className="appIcon" alt="" src="App_Icon.png" />
            <div className="appName">Nom Nom</div>
            <div className="screenName">{screen_name}</div>
            <img className="userIcon" alt="" src="User_Icon.svg" />
            <img className="bellIcon" alt="" src="Bell_Icon.svg" />
            <img className="saltIcon" alt="" src="Salt_Icon.svg" />
            <img className="bookIcon" alt="" src="Book_Icon.svg" />
            <img className="heartIcon" alt="" src="Heart_Icon.svg" />
        </div>
    );
}

export default NavigationBar