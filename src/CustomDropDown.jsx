import { useState } from "react";
function CustomDropDown({ selectedValue, handleChange, disabled }) {
  return (
    <div className="custom-dropdown">
      <select value={selectedValue} onChange={handleChange} disabled={disabled}>
        <option
          value="low"
          className={selectedValue === "low" ? "circle-low" : ""}
        >
          Low
        </option>
        <option
          value="high"
          className={selectedValue === "high" ? "circle-high" : ""}
        >
          High
        </option>
        <option
          value="urgent"
          className={selectedValue === "urgent" ? "circle-urgent" : ""}
        >
          Urgent
        </option>
      </select>
    </div>
  );
}
export default CustomDropDown;
