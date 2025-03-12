import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Recipe from "./Recipe";
import styles from "./Favorites.module.scss";
import { useAuth } from './context/AuthContext';

const Favorites = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    // Filter favorites based on search
    const filteredFavorites = user?.favoriteRecipes?.filter(
        (recipe) =>
            recipe.strMeal?.toLowerCase().includes(search.toLowerCase()) ||
            recipe.strCategory?.toLowerCase().includes(search.toLowerCase()) ||
            recipe.author?.username?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const handleDelete = (deletedId) => {
        // No need to implement delete here as it's handled by the Recipe component
        // The favorites list will update automatically through AuthContext
    };

    if (!user) {
        return <div className={styles.message}>Please log in to view your favorites.</div>;
    }

    return (
        <div className={styles.favorites}>
            <SearchBar search={search} setSearch={setSearch} />
            {loading && <div className={styles.loading}>Loading...</div>}
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.favorites__grid}>
                {filteredFavorites.length > 0 ? (
                    filteredFavorites.map((recipe) => (
                        <Recipe 
                            key={recipe._id} 
                            item={recipe}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <div className={styles.message}>
                        {search ? "No favorites match your search." : "You haven't favorited any recipes yet."}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;