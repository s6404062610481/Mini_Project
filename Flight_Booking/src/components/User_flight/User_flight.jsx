import React, { useState,useEffect  } from 'react'
import { MdEventSeat } from 'react-icons/md';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import { IoExitOutline } from 'react-icons/io5'
import Axios from 'axios';
import Dropdown from '../User/Dropdown'

const seats = Array.from({ length: 15 }, (_, index) => `A${index + 1}`);

function User_flight() {

    const [Selected, setSelected] = useState("")
    const [Date, setDate] = useState("")

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
      setDate(selectedDate);
      console.log('Selected Date:', selectedDate);
      // You can do other things with the selected date here, if needed
    };

    //submit SELECT data 
    const handleSearchClick = () => {
      console.log('handleSearchClick:', Selected);
      console.log('handleSearchClick :', Date);
      axios.get('http://localhost:3333/api/flight', {
        params: {
          destination: Selected,
          fdate: Date
        }
      })
      .then((response) => {
        // Handle and display the data in your React app
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };
  
    return (
        <div>
            <div className='Home'>
                <div className='nav-user'>
                    <div className="logo-user">
                        <Link to="/user">Canfly</Link>
                    </div> 
                    <div className="navcenter-user">
                        <div className="navhome-user">
                            <NavLink to="/user">Home</NavLink>
                        </div>
                        <div className="navorder-user">
                            <NavLink to="/user_order">Your order</NavLink>
                        </div>
                    </div>
                    <div className="nav-right">
                        <div className='nav-username'>
                        {username}
                        </div>
                    </div>
                    <IoExitOutline 
                    className='icon-user-exit' 
                    size={25} 
                    onClick={logout}
                    />
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
                    to='/user_ticket' 
                    onClick={handleSearchClick}>Search</Link>
                </div>

            </div>
        </div>
    )
    }

export default User_flight
