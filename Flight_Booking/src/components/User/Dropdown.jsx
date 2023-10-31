import React, { useState } from 'react';

function Dropdown({ Selected, setSelected, onChange }) {
  const [IsActive, setIsActive] = useState(false);
  const option = ["Phuket", "hadyai", "krabi"]; // Corrected spelling

  return (
    <div>
      <div className="dropdown">
        <div className="dropdown-btn" onClick={(e) => setIsActive(!IsActive)}>
          {Selected}
        </div>
        {IsActive && (
          <div className="dropdown-content">
            {option.map((option) => (
              <div
                className="dropdown-item"
                key={option}
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);

                  // Call the onChange callback with the selected value
                  onChange(option);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;