import React, { useState } from "react";
import styles from "./Recipe.module.scss";

const Recipe = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Helper function to get all ingredients and measures
  const getIngredients = () => {
    const ingredients = [];
    
    // Check if ingredients are stored in the array format
    if (Array.isArray(item.ingredients)) {
      return item.ingredients.map(ing => ({
        ingredient: ing.ingredient.trim(),
        measure: ing.measure.trim()
      }));
    }

    // Otherwise, check for strIngredient format
    for (let i = 1; i <= 20; i++) {
      const ingredient = item[`strIngredient${i}`];
      const measure = item[`strMeasure${i}`];
      // Only add if ingredient exists and is not empty
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  // Get ingredients list when component renders
  const ingredientsList = getIngredients();

  return (
    <div 
      className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
      onClick={toggleExpand}
    >
      <img src={item.strMealThumb} alt={item.strMeal} className={styles.image} />
      <button className={styles.favoriteButton} onClick={toggleFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
      <div className={styles.cardBottom}>
        <h4 className={styles.chefName}>{item.author?.username || 'Unknown Chef'}</h4>
        <p className={styles.foodName}>{item.strMeal}</p>
        <p className={styles.category}>{item.strCategory}</p>
        
        {/* Preview of ingredients count */}
        <p className={styles.ingredientCount}>
          {ingredientsList.length} ingredients
        </p>
      </div>

      {isExpanded && (
        <div className={styles.expandedContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.ingredients}>
            <h5>Ingredients</h5>
            {ingredientsList.length > 0 ? (
              <ul>
                {ingredientsList.map((ing, index) => (
                  <li key={index}>
                    <span className={styles.measure}>{ing.measure}</span>
                    <span className={styles.ingredient}>{ing.ingredient}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noIngredients}>No ingredients listed</p>
            )}
          </div>
          <div className={styles.instructions}>
            <h5>Instructions</h5>
            <p>{item.strInstructions}</p>
          </div>
          {item.strYoutube && (
            <div className={styles.youtube}>
              <h5>Video Tutorial</h5>
              <a href={item.strYoutube} target="_blank" rel="noopener noreferrer">
                Watch on YouTube
              </a>
            </div>
          )}
          <button className={styles.closeButton} onClick={toggleExpand}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipe;