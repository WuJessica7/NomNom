import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import RecipeCard from "./Recipe";
import styles from "./Recipes.module.scss";

const Recipes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchRecipes = async (pageNum = 1, searchQuery = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5000/api/recipes?page=${pageNum}&search=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data.recipes);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes when component mounts
  useEffect(() => {
    fetchRecipes(page, search);
  }, [page]);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1); // Reset to first page when searching
      fetchRecipes(1, search);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.hasPrevPage) {
      setPage(prev => prev - 1);
    }
  };

  return (
    <div className={styles.recipes}>
      <div className={styles.header}>
        <SearchBar search={search} setSearch={setSearch} />
        <button 
          className={styles.createButton}
          onClick={() => navigate('/create-recipe')}
        >
          Create Recipe
        </button>
      </div>
      
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.recipes__grid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} item={recipe} />
        ))}
      </div>

      {pagination && (
        <div className={styles.pagination}>
          <button 
            onClick={handlePrevPage}
            disabled={!pagination.hasPrevPage}
            className={styles.paginationButton}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!pagination.hasNextPage}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipes;