import { MainPageNavigationBar } from "./NavigationBars"
import { Link } from 'react-router-dom';
import "./HomePage.css"

function Hero() {
    return(
        <div className="hero-section">
            <div className="header">Discover, Cook, and Share!</div>
            <p className="description">Turn your ingredients into delicious meals with NomNom — your personalized recipe and food-sharing app! Upload your ingredients, get recipe suggestions, and connect with fellow cooking enthusiasts.</p>
            <Link to="/create-account">
                <div className="rectangle1" />
                <div className="create-acc-text">Create Account</div>
            </Link>
            <img className="appIcon1" alt="" src="Hamster.png" />
        </div>
    );
}

function Section2 () {
    return(
        <div className="section-2">
            <div className="header2">Upload Ingredients and Track Expiration Dates</div>
            <p className="description2">Stay organized and reduce waste! Upload your ingredients, and we’ll track expiration dates, send reminders, and suggest recipes — so you never waste food or eat expired items.</p>
            <img className="appIcon2" alt="" src="Hamster.png" />
        </div>
    );
}

function Section3 (){
    return(
        <div className="section-3">
            <div className="header3">Discover Recipes With Uploaded Ingredients</div>
            <p className="description3">Turn your ingredients into delicious meals! Upload what you have, and we’ll suggest recipes tailored to your pantry—no extra trips to the store needed.</p>
            <img className="appIcon3" alt="" src="Hamster.png" />
        </div>
    );
}

function Section4 () {
    return(
        <div className="section-4">
            <div className="header4">Share meals and connect with friends!</div>
            <p className="description4">Post your dishes, see what your friends are cooking, and interact with their meals through comments and reactions.</p>
            <img className="appIcon4" alt="" src="Hamster.png" />
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
                <Section2 />
                <div className="line-div2" />
                <Section3 />
                <div className="line-div3" />
                <Section4 />

            </div>
        </>
    );

}


export default HomePage;