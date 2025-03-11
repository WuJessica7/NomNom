import { MainPageNavigationBar } from "./NavigationBars"
import { Link } from 'react-router-dom';
import "./HomePage.css"

function Hero() {
    return(
        <div className="hero-section">
            <div className="header">Discover, Cook, and Share!</div>
            <p className="description">Turn your ingredients into delicious meals with NomNom — your personalized recipe and food-sharing app! Upload your ingredients, get recipe suggestions, and connect with fellow cooking enthusiasts.</p>
            <Link to="/create-account">
                <div className="rectangle" />
                <div className="create-acc-text">Create Account</div>
            </Link>
            <img className="appIcon1" alt="" src="App_Icon.png" />
        </div>
    );
}

function HomePage() {
    return(
        <>
            <div className="mainpage">
                <MainPageNavigationBar />
                <Hero />
                <div className="line-div" />
            </div>
        </>
    );

}


export default HomePage;