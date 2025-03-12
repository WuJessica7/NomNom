import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import styles from "./Recipe.module.scss";

const Recipe = ({ item, onDelete }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const cardRef = useRef(null);

  // Check if recipe is in user's favorites on component mount
  useEffect(() => {
    if (user && user.favoriteRecipes) {
      setIsFavorite(user.favoriteRecipes.some(favRecipe => 
        favRecipe._id === item._id || favRecipe === item._id
      ));
    }
  }, [user, item._id]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}/favorites/${item._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to toggle favorite');
      }

      const data = await response.json();
      setUser(data.user); // Update the user context with new favorites
      setIsFavorite(data.isFavorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const toggleExpand = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      cardRef.current.style.transformOrigin = `${centerX}px ${centerY}px`;
    }
    setIsExpanded(!isExpanded);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-recipe/${item._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${item._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        if (onDelete) {
          onDelete(item._id);
        }
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
    setShowDeleteConfirm(false);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  // Check if current user is the author
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?._id;
  const authorId = item.author?._id;
  const isAuthor = currentUserId && authorId && currentUserId === authorId;
  
  // Debug logs
  console.log('Recipe:', item.strMeal);
  console.log('Current User:', currentUser);
  console.log('Current User ID:', currentUserId);
  console.log('Recipe Author:', item.author);
  console.log('Author ID:', authorId);
  console.log('Is Author:', isAuthor);

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
      ref={cardRef}
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
        
        {/* Author actions */}
        {isAuthor && (
          <div className={styles.authorActions}>
            <button 
              className={styles.editButton}
              onClick={handleEdit}
            >
              Edit Recipe
            </button>
            <button 
              className={styles.deleteButton}
              onClick={handleDelete}
            >
              Delete Recipe
            </button>
          </div>
        )}

        {/* Delete confirmation dialog */}
        {showDeleteConfirm && (
          <div className={styles.deleteConfirm} onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to delete this recipe?</p>
            <div className={styles.deleteActions}>
              <button onClick={confirmDelete} className={styles.confirmButton}>
                Yes, Delete
              </button>
              <button onClick={cancelDelete} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        )}
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