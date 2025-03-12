import "./IngredientsPage.css"
import { NavigationBar } from "./NavigationBars";


function IngredientBox({ top_dist }) {
    return(
        <>
            <div className="ingredient-group" style={{top: top_dist}}>
                <div className="ingredient-rectangle" />
                <div className="ingredient-name">Ingredient Name</div>
                <div className="quantity">Quantity</div>
                <div className="expiration-date">Expiration Date</div>
                <div className="x">X</div>
            </div>
        </>
    );
}

function IngredientPage(){
    return (
        <div className="ingredients-page">
            <NavigationBar screen_name="Ingredients" />
            <div className="ingredients-list">
                <IngredientBox top_dist={0}/>
                <IngredientBox top_dist={100}/>
                <IngredientBox top_dist={200}/>
                <IngredientBox top_dist={300}/>
                <IngredientBox top_dist={400}/>
                <IngredientBox top_dist={500}/>
                <IngredientBox top_dist={600}/>
                <IngredientBox top_dist={700}/>
            </div>

            <div className="new-ingredient">
                <div className="add-button">
                    <div className="add-ingredient">Add Ingredient</div>
                </div>
                <div className="input-field" style={{top : 0}}>
                    <div className="new-ingredient-text">Ingredient Name</div>
                </div>
                <div className="input-field" style={{top : 50}}>
                    <div className="new-ingredient-text">Quantity</div>
                </div>
                <div className="input-field" style={{top : 100}}>
                    <div className="new-ingredient-text">Expiration Date</div>
                </div>

            </div>

        </div>
    );
}

export default IngredientPage