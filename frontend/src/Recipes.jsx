import React, { useState } from "react";
import SearchBar from "./SearchBar";
import RecipeCard from "./Recipe";
import styles from "./Recipes.module.scss";
import { NavigationBar } from "./NavigationBars";

const recipeItems = [
    { id: 1, chef: "Chef A", food: "Food A", image: "Food_Image.png" },
    { id: 2, chef: "Chef B", food: "Food B", image: "Food_Image.png" },
    { id: 3, chef: "Chef C", food: "Food C", image: "Food_Image.png" },
    { id: 4, chef: "Chef D", food: "Food D", image: "Food_Image.png" },
    { id: 5, chef: "Chef E", food: "Food E", image: "Food_Image.png" },
    { id: 6, chef: "Chef F", food: "Food F", image: "Food_Image.png" },
];

const Recipes = () => {
  const [search, setSearch] = useState("");

  const filteredItems = recipeItems.filter(
    (item) =>
      item.food.toLowerCase().includes(search.toLowerCase()) ||
      item.chef.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.recipes}>
      <NavigationBar screen_name="Recipes" />
      <SearchBar search={search} setSearch={setSearch} />
      <div className={styles.recipes__grid}>
        {filteredItems.map((item) => (
          <RecipeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;