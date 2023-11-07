import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Ticket.css'
import { Link } from 'react-router-dom'
import Dropdown from '../User/Dropdown'
import axios from 'axios';

function Ticket() {
    const [Selected, setSelected] = useState('')
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({flight: []});

   

    const navigate = useNavigate();

    //get name
    const username = localStorage.getItem('username');
      
    
    //function logout
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/Login');
    };

    //get value from dropdown
    const handleDropdownChange = (selectedValue) => {
      setSelected(selectedValue);
      // You can now use the selected value in this parent component
      console.log('Selected option in parent component:', selectedValue);
    };

    //get data form
    const handleDateChange = (e) => {
      const selectedDate = e.target.value;
      setSelectedDate(selectedDate);
      console.log('Selected Date:', selectedDate);
      // You can do other things with the selected date here, if needed
    };

    //submit SELECT data 
    const handleSearchClick = async () => { // Mark the function as async
      console.log('handleSearchClick:', Selected);
      console.log('handleSearchClick:', selectedDate);
      setIsLoading(true);
  
      try {
        const response = await axios.get('http://localhost:3333/api/flight', {
          params: {
            destination: Selected,
            fdate: selectedDate,
          }
        });
        // Handle and display the data in your React app
        console.log(response.data);
        const result = await response.data;
        console.log('result is: ', JSON.stringify(result, null, 4));
        
       setData({ 
        flight: result
      });
 
      } catch (error) {
        console.error('Error:', error);
      }finally {
        setIsLoading(false);
      }
    };
    console.log('Data state:', data);

  return (
    <div>
        <div className='Home'>
            <div className='nav'>
                <div className="logo">
                    <Link to="/">Canfly</Link>
                </div> 
                <div className="navcenter">
                    <div className="navhome">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="navorder">
                        <Link to="/">Your order</Link>
                    </div>
                </div>
                <div className="in">
                    <div className='sign'>
                        <Link to="/Signin">SIGN IN</Link>
                    </div>
                    <div className='log'>
                        <Link to="/Login">LOG IN</Link>
                    </div>
                </div>
            </div>

            <div className="dropdown-data-user-ticket">
                  <Dropdown 
                  Selected={Selected} 
                  setSelected={setSelected} 
                  onChange={handleDropdownChange}/>
                    
                  <input type="date" 
                  className='date-input' 
                  onChange={handleDateChange}
             
                  />
              </div> 

              <div className="submit-user-ticket">
                  <Link 
                  to='/ticket' 
                  onClick={handleSearchClick}>Search</Link>
              </div>
            
            {data.flight.map(flight => (
                <div className="ticket-user-ticket">
               
                    <div className="ticket-form" key={flight.Fid}>
                         
                            <div className="goto" >
                                เดินทางไปที่ :  {flight.Destination}
                            </div>
        
                            <div className="date">
                                วัน :  {new Date(flight.Fdate).toLocaleDateString()}
                            </div>
                            <div className="time">
                                เวลา : {flight.Ftime}
                            </div>
                        
                            <div className="next">
                            <Link to="/flight">จองที่นั่ง</Link>
                            </div>  
                    </div>                      
                </div>
                   ))}

        </div>

    </div>
  )
}

export default Ticket
