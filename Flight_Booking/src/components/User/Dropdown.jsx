import React, { useState } from 'react'

function Dropdown({Selected, setSelected}) {

    const [IsActive, setIsActive] = useState(false)
    const option = ["Puket", "Bankkok", "Karbi"]
    
  return (
    <div>
        <div className="dropdown">
            <div className="dropdown-btn" onClick={ (e) => setIsActive(!IsActive) }>
                {Selected}
            </div>
            {IsActive && (
                <div className="dropdown-content">
                    {option.map((option) => (
                        <div className="dropdowm-item" 
                        onClick={(e) => {
                                setSelected(option)
                                console.log('Selected option:', option);
                                setIsActive(false)
                            }}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Dropdown
