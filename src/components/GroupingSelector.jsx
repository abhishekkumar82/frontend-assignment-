import React from "react";
import DisplayIcon from "../assets/Display.svg";

const GroupingSelector = ({ setGrouping }) => {
  return (
    <div className="grouping-selector">
      <img src={DisplayIcon} alt="Display" className="icon" />
      <select onChange={(e) => setGrouping(e.target.value)}>
        <option value="status">Group by Status</option>
        <option value="user">Group by User</option>
        <option value="priority">Group by Priority</option>
      </select>
    </div>
  );
};

export default GroupingSelector;
