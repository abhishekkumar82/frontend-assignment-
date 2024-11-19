import React from "react";

const SortingSelector = ({ setSortOrder }) => {
  return (
    <select onChange={(e) => setSortOrder(e.target.value)}>
      <option value="priority">Sort by Priority</option>
      <option value="title">Sort by Title</option>
    </select>
  );
};

export default SortingSelector;
