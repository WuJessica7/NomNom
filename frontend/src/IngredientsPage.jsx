import "./IngredientsPage.css";
import { NavigationBar } from "./NavigationBars";
import { useState, useEffect } from "react";

// Helper function to format the date in mm/dd/yyyy format
const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
};

// Helper function to get expiration status
const getExpirationStatus = (expirationDate) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  if (expiration.toDateString() === today.toDateString()) return "EXPIRES TODAY";
  if (expiration < today) return "EXPIRED";
  return formatDate(expirationDate);
};

// Function to sort ingredients by expiration date
const sortIngredients = (ingredients) => {
  return [...ingredients].sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
};

function IngredientBox({ ingredient, onRemove }) {
  console.log('Rendering ingredient:', ingredient);
  return (
    <div className="ingredient-group">
      <div className="ingredient-rectangle" />
      <div className="ingredient-name">{ingredient.name}</div>
      <div className="quantity">{ingredient.quantity}</div>
      <div className="expiration-date">{getExpirationStatus(ingredient.expirationDate)}</div>
      <div className="x" onClick={() => onRemove(ingredient._id)}>X</div>
    </div>
  );
}

function IngredientPage() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch ingredients when component mounts
  useEffect(() => {
    console.log('Component mounted, fetching ingredients...');
    fetchIngredients();
  }, []);

  // Log whenever ingredients state changes
  useEffect(() => {
    console.log('Ingredients state updated:', ingredients);
  }, [ingredients]);

  const fetchIngredients = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Fetching ingredients...');
      const response = await fetch(`http://localhost:5000/api/ingredients`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 404) {
          setIngredients([]);
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch ingredients');
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      if (!data || !Array.isArray(data.ingredients)) {
        console.warn('Invalid response format:', data);
        setIngredients([]);
        return;
      }

      const sortedIngredients = sortIngredients(data.ingredients);
      console.log('Sorted ingredients:', sortedIngredients);
      setIngredients(sortedIngredients);
      setError("");
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Failed to connect to the server. Please check if the server is running.');
      setIngredients([]);
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = async () => {
    if (!ingredientName || !quantity || !expirationDate) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:5000/api/ingredients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: ingredientName,
          quantity,
          expirationDate
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add ingredient');
      }

      const data = await response.json();
      console.log('Add ingredient response:', data);
      
      if (!data || !Array.isArray(data.ingredients)) {
        console.warn('Invalid response format:', data);
        await fetchIngredients(); // Fallback to fetching all ingredients
        return;
      }

      const sortedIngredients = sortIngredients(data.ingredients);
      console.log('Updated ingredients:', sortedIngredients);
      setIngredients(sortedIngredients);
      
      // Clear input fields and error
      setIngredientName("");
      setQuantity("");
      setExpirationDate("");
      setError("");
    } catch (err) {
      console.error('Add ingredient error:', err);
      setError(err.message || 'Failed to connect to the server. Please check if the server is running.');
    }
  };

  const removeIngredient = async (ingredientId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:5000/api/ingredients/${ingredientId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove ingredient');
      }

      const data = await response.json();
      console.log('Remove ingredient response:', data);
      
      if (!data || !Array.isArray(data.ingredients)) {
        console.warn('Invalid response format:', data);
        await fetchIngredients(); // Fallback to fetching all ingredients
        return;
      }

      const sortedIngredients = sortIngredients(data.ingredients);
      console.log('Updated ingredients after removal:', sortedIngredients);
      setIngredients(sortedIngredients);
    } catch (err) {
      console.error('Remove ingredient error:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="ingredients-page">
        <NavigationBar screen_name="Ingredients" />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="ingredients-page">
      <NavigationBar screen_name="Ingredients" />
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="ingredients-list">
        {ingredients.length === 0 && !loading && !error ? (
          <div className="no-ingredients">
            No ingredients added yet. Add your first ingredient below!
          </div>
        ) : (
          ingredients.map((ingredient, index) => (
            <IngredientBox
              key={ingredient._id || index}
              ingredient={ingredient}
              onRemove={removeIngredient}
            />
          ))
        )}
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
            type="date"
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
