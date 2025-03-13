import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateRecipe.module.scss';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    strMeal: '',
    strCategory: '',
    strInstructions: '',
    strMealThumb: '',
    strYoutube: '',
  });
  const [ingredients, setIngredients] = useState([{ ingredient: '', measure: '' }]);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
      [field]: value
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

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Clear the URL input since we're using a file
      setRecipe(prev => ({ ...prev, strMealThumb: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Convert ingredients array to the required format
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

      // First create the recipe
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(recipeData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create recipe');
      }

      const createdRecipe = await response.json();

      // If we have an image file, upload it
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageResponse = await fetch(`http://localhost:5000/api/recipes/${createdRecipe._id}/image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (!imageResponse.ok) {
          console.error('Failed to upload image, but recipe was created');
        }
      }

      navigate('/recipes');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.createRecipe}>
      <h2>Create New Recipe</h2>
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
            <label>Recipe Image:</label>
            <div className={styles.imageInputs}>
              <div className={styles.urlInput}>
                <label htmlFor="strMealThumb">Image URL:</label>
                <input
                  type="url"
                  id="strMealThumb"
                  name="strMealThumb"
                  value={recipe.strMealThumb}
                  onChange={handleRecipeChange}
                  placeholder="Enter image URL"
                  disabled={imageFile !== null}
                />
              </div>
              <div className={styles.orDivider}>OR</div>
              <div className={styles.fileInput}>
                <label htmlFor="imageFile">Upload Image:</label>
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  disabled={recipe.strMealThumb !== ''}
                />
              </div>
            </div>
            {imagePreview && (
              <div className={styles.imagePreview}>
                <img src={imagePreview} alt="Preview" />
                <button 
                  type="button" 
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className={styles.removePreview}
                >
                  Remove
                </button>
              </div>
            )}
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
            Create Recipe
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

export default CreateRecipe; 