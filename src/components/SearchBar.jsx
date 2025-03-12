import React from "react";
import styles from "../styles/SearchBar.module.scss";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;