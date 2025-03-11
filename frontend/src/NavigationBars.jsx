import "./NavigationBars.css";

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


function MainPageNavigationBar() {
    return(
        <div className="navigationBar">
            <img className="appIcon" alt="" src="App_Icon.png" />
            <div className="appName">Nom Nom</div>
            <text className="signIn">Sign In</text>

        </div>
    );
}


function OtherNavigationBar() {
    return(
        <div className="navigationBar">
            <img className="appIcon" alt="" src="App_Icon.png" />
            <div className="appName">Nom Nom</div>
            <text className="back">Back</text>
        </div>
    );
}


export { NavigationBar, MainPageNavigationBar, OtherNavigationBar};