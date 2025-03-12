import "./IngredientsPage.css";
import { NavigationBar } from "./NavigationBars";
import { useState } from "react";

function IngredientBox({ ingredient, index, removeIngredient }) {
  return (
    <div className="ingredient-group" style={{ top: index * 100 }}>
      <div className="ingredient-rectangle" />
      <div className="ingredient-name">{ingredient.name}</div>
      <div className="quantity">{ingredient.quantity}</div>
      <div className="expiration-date">{ingredient.expirationDate}</div>
      <div className="x" onClick={() => removeIngredient(index)}>X</div>
    </div>
  );
}

function IngredientPage() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const addIngredient = () => {
    if (!ingredientName || !quantity || !expirationDate) return;

    setIngredients([
      ...ingredients,
      { name: ingredientName, quantity, expirationDate },
    ]);

    // Clear input fields
    setIngredientName("");
    setQuantity("");
    setExpirationDate("");
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="ingredients-page">
      <NavigationBar screen_name="Ingredients" />
      <div className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <IngredientBox
            key={index}
            ingredient={ingredient}
            index={index}
            removeIngredient={removeIngredient}
          />
        ))}
      </div>

      <div className="new-ingredient">
        <div className="add-button" onClick={addIngredient}>
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