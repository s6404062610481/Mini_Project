import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserTicket() {
  const [Selected, setSelected] = useState; // ทำให้ Selected เป็น state และกำหนดค่าเริ่มต้นให้เป็น useState()
  const [Date, setDate] = useState; // ทำให้ Date เป็น state และกำหนดค่าเริ่มต้นให้เป็น useState()
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // Get flights data from API based on selected destination and date
    axios.get('http://localhost:3333/api/flight', {
      params: {
        destination: Selected,
        fdate: Date
      }
    })
    .then((response) => {
      // Set the fetched flights data to state
      setFlights(response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [Selected, Date]); // Run the effect whenever Selected or Date changes

  return (
    <div>
      <h1>Flights for Destination: {Selected} on Date: {Date}</h1>
      <ul>
        {flights.map((flight) => (
          <li key={flight.Fid}>
            {flight.Airline} - {flight.Ftime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserTicket;
