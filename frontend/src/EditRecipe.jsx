import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreateRecipe.module.scss';

const EditRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    strMeal: '',
    strCategory: '',
    strInstructions: '',
    strMealThumb: '',
    strYoutube: '',
  });
  const [ingredients, setIngredients] = useState([{ ingredient: '', measure: '' }]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Recipe not found');
        }
        const data = await response.json();
        
        // Set basic recipe data
        setRecipe({
          strMeal: data.strMeal,
          strCategory: data.strCategory,
          strInstructions: data.strInstructions,
          strMealThumb: data.strMealThumb,
          strYoutube: data.strYoutube || '',
        });

        // Set ingredients
        if (Array.isArray(data.ingredients)) {
          setIngredients(data.ingredients);
        } else {
          // Handle legacy format
          const ingredientsList = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = data[`strIngredient${i}`];
            const measure = data[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
              ingredientsList.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : ''
              });
            }
          }
          setIngredients(ingredientsList.length > 0 ? ingredientsList : [{ ingredient: '', measure: '' }]);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load recipe');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleRecipeChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value.trim()
    };
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    if (ingredients.length < 20) {
      setIngredients([...ingredients, { ingredient: '', measure: '' }]);
    }
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const recipeData = {
        strMeal: recipe.strMeal.trim(),
        strCategory: recipe.strCategory.trim(),
        strInstructions: recipe.strInstructions.trim(),
        strYoutube: recipe.strYoutube,
        strMealThumb: recipe.strMealThumb || 'https://via.placeholder.com/400x300?text=No+Image',
        ingredients: ingredients
          .filter(item => item.ingredient.trim())
          .map(item => ({
            ingredient: item.ingredient.trim(),
            measure: item.measure.trim()
          }))
      };

      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(recipeData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update recipe');
      }

      navigate('/recipes');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.createRecipe}>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.mainFields}>
          <div className={styles.field}>
            <label htmlFor="strMeal">Recipe Name:</label>
            <input
              type="text"
              id="strMeal"
              name="strMeal"
              value={recipe.strMeal}
              onChange={handleRecipeChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="strCategory">Category:</label>
            <input
              type="text"
              id="strCategory"
              name="strCategory"
              value={recipe.strCategory}
              onChange={handleRecipeChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="strMealThumb">Image URL:</label>
            <input
              type="url"
              id="strMealThumb"
              name="strMealThumb"
              value={recipe.strMealThumb}
              onChange={handleRecipeChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="strYoutube">YouTube Link (optional):</label>
            <input
              type="url"
              id="strYoutube"
              name="strYoutube"
              value={recipe.strYoutube}
              onChange={handleRecipeChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="strInstructions">Instructions:</label>
            <textarea
              id="strInstructions"
              name="strInstructions"
              value={recipe.strInstructions}
              onChange={handleRecipeChange}
              required
            />
          </div>
        </div>

        <div className={styles.ingredients}>
          <h3>Ingredients</h3>
          {ingredients.map((item, index) => (
            <div key={index} className={styles.ingredientRow}>
              <div className={styles.field}>
                <label>Ingredient {index + 1}:</label>
                <input
                  type="text"
                  value={item.ingredient}
                  onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Measure {index + 1}:</label>
                <input
                  type="text"
                  value={item.measure}
                  onChange={(e) => handleIngredientChange(index, 'measure', e.target.value)}
                  required
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {ingredients.length < 20 && (
            <button
              type="button"
              onClick={addIngredient}
              className={styles.addButton}
            >
              Add Ingredient
            </button>
          )}
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>
            Update Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate('/recipes')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe; 