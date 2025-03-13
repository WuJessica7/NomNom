import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Recipe from './Recipe';
import styles from './Activity.module.scss';

const Activity = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    if (!user) {
        return <div className={styles.activity}>Please log in to view your activity.</div>;
    }

    // Filter out invalid or deleted recipes
    const validRecipes = user.cookedRecipes?.filter(recipe => 
        recipe && 
        recipe._id && 
        recipe.strMeal && 
        recipe.strMealThumb && 
        recipe.strCategory
    ) || [];

    return (
        <div className={styles.activity}>
            <div className={styles.recipeGrid}>
                {validRecipes.length > 0 ? (
                    validRecipes.map((recipe) => (
                        <Recipe 
                            key={recipe._id} 
                            item={recipe} 
                            hideFavoriteButton={true}
                        />
                    ))
                ) : (
                    <div className={styles.message}>
                        You haven't cooked any recipes yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Activity;