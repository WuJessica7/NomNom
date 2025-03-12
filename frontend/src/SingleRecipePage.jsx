import { OtherNavigationBar } from "./NavigationBars";
import "./SingleRecipePage.css"


function SingleRecipePage() {
    return(
        <>
            <div className="single-recipe">
                <OtherNavigationBar />
                <img className="food-image" alt="" src="Food_Image.png" />
                <div className="recipe-name">Recipe Name</div>
                <div className="ingredients">
                    <div className="ingredients-header">Ingredients:</div>
                    <div className="ingredient-1">
                        <div className="rectangle2" />   
                        <div className="ingredient-text">ingredient 1</div>
                    </div>
                    <div className="ingredient-2">
                        <div className="rectangle2" /> 
                        <div className="ingredient-text">ingredient 2</div>
                    </div>
                    <div className="ingredient-3">
                        <div className="rectangle2" />
                        <div className="ingredient-text">ingredient 3</div>
                    </div>
                    <div className="ingredient-4">
                        <div className="rectangle2" />
                        <div className="ingredient-text">ingredient 4</div>
                    </div>
                    <div className="ingredient-5">
                        <div className="rectangle2" />
                        <div className="ingredient-text">ingredient 5</div>
                    </div>
                    <div className="ingredient-6">
                        <div className="rectangle2" />
                        <div className="ingredient-text">ingredient 6</div>
                    </div>
                    <div className="ingredient-7">
                        <div className="rectangle2" />
                        <div className="ingredient-text">ingredient 7</div>
                    </div>
                    <div className="ingredient-8">
                        <div className="rectangle2" />
                        <div className="ingredient-text">ingredient 8</div>
                    </div>
                    <div className="ingredient-9">
                        <div className="rectangle2" />
                        <div className="ingredient-text">ingredient 9</div>
                    </div>
                    <div className="ingredient-10">
                        <div className="rectangle2" />
                        <div className="ingredient-text">ingredient 10</div>
                    </div>
                </div>

                <div className="instructions">
                    <div className="instructions-header">Instructions:</div>
                    <div className="instruction-1">
                        <ol start="1" className="instruction-text">
                            <li>Instruction 1</li>
                        </ol>
                    </div>
                    <div className="instruction-2">
                        <ol start="2" className="instruction-text">
                            <li>Instruction 2</li>
                        </ol>
                    </div>
                    <div className="instruction-3">
                        <ol start="3" className="instruction-text">
                            <li>Instruction 3</li>
                        </ol>
                    </div>
                    <div className="instruction-4">
                        <ol start="4" className="instruction-text">
                            <li>Instruction 4</li>
                        </ol>
                    </div>
                    <div className="instruction-5">
                        <ol start="5" className="instruction-text">
                            <li>Instruction 5</li>
                        </ol>
                    </div>
                    <div className="instruction-6">
                        <ol start="6" className="instruction-text">
                            <li>Instruction 6</li>
                        </ol>
                    </div>
                    <div className="instruction-7">
                        <ol start="7" className="instruction-text">
                            <li>Instruction 7</li>
                        </ol>
                    </div>
                    <div className="instruction-8">
                        <ol start="8" className="instruction-text">
                            <li>Instruction 8</li>
                        </ol>
                    </div>
                    <div className="instruction-9">
                        <ol start="9" className="instruction-text">
                            <li>Instruction 9</li>
                        </ol>
                    </div>
                    <div className="instruction-10">
                        <ol start="10" className="instruction-text">
                            <li>Instruction 10</li>
                        </ol>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SingleRecipePage;