import "./IngredientsPage.css";
import { NavigationBar } from "./NavigationBars";
import { useState } from "react";

function IngredientBox({ top_dist }) {
  return (
    <>
      <div className="ingredient-group" style={{ top: top_dist }}>
        <div className="ingredient-rectangle" />
        <div className="ingredient-name">Ingredient Name</div>
        <div className="quantity">Quantity</div>
        <div className="expiration-date">Expiration Date</div>
        <div className="x">X</div>
      </div>
    </>
  );
}

function IngredientPage() {
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  return (
    <div className="ingredients-page">
      <NavigationBar screen_name="Ingredients" />
      <div className="ingredients-list">
        <IngredientBox top_dist={0} />
        <IngredientBox top_dist={100} />
        <IngredientBox top_dist={200} />
        <IngredientBox top_dist={300} />
        <IngredientBox top_dist={400} />
        <IngredientBox top_dist={500} />
        <IngredientBox top_dist={600} />
        <IngredientBox top_dist={700} />
      </div>

      <div className="new-ingredient">
        <div className="add-button">
          <div className="add-ingredient">Add Ingredient</div>
        </div>
        <div className="input-field" style={{ top: 0 }}>
          <input
            type="text"
            className="new-ingredient-text"
            placeholder="Ingredient Name"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
          />
        </div>
        <div className="input-field" style={{ top: 50 }}>
          <input
            type="text"
            className="new-ingredient-text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="input-field" style={{ top: 100 }}>
          <input
            type="text"
            className="new-ingredient-text"
            placeholder="Expiration Date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default IngredientPage;