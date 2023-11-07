import React, { useState,useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoExitOutline } from 'react-icons/io5'
import axios from 'axios'
import Dropdown from '../User/Dropdown'
import './User_ticket.css'

function User_ticket() {

    const [navActive, setnavActive] = useState("navcenter-user-ticket");
    const navToggle = () => {
        if(navActive==="navcenter-user-ticket"){
            setnavActive("navcenter-user-ticket nav__active-ticket"); console.log("active")
        }else{
            setnavActive("navcenter-user-ticket"); console.log("no")
        }
    }

  const [Selected, setSelected] = useState('')
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({flight: []});
  const [usernamecookies, setUsernamecookies] = useState(''); 

   

    const navigate = useNavigate();

    //get name
    const username = localStorage.getItem('username');
      
    
    //function logout
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      deleteCookie("username");
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
    //delete cookie
    function deleteCookie(name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    
    useEffect(() => {

  
      //get cookies
        function getCookie(name) {
          const cookies = document.cookie.split('; ');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
              return cookieValue;
            }
          }
          return null; // หากไม่พบคูกกี้ที่ต้องการ
        }
        const usernamecookies = getCookie('username');
        setUsernamecookies(usernamecookies);

      const token = localStorage.getItem('token')
      console.log(token);

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Specify the content type if needed
        },
      };

      axios.get('http://localhost:3333/api/flightall').then((response) => {
        const result =  response.data;
        setData({ 
            flight: result
          });
        console.log(response);
      })
      .catch((error) => {
        // handle errors
      });
  
      console.log('Headers:', config.headers);
      axios.post("http://localhost:3333/authen", {}, config)
        .then((response) => {
          console.log(response.data);
          if(response.data.status === 'ok'){
          } else {
            alert('Invalid authen');
            navigate('/Login');
        }
        // Handle the successful login response (e.g., store tokens, redirect)
      })
      .catch((error) => {
        console.error("Login error:", error.response.data);
        // Handle login error (e.g., show an error message)
        alert("Incorrect information. Please check your credentials.");
      });
    }, [,]);

    return (
      <div>
          <div className='Home'>
              <nav>
                  <div className="logo-user">
                          <Link to="/user">Canfly</Link>
                      </div> 
                      <div className={navActive}>
                          <div className="navhome-user">
                              <NavLink to="/user">Home</NavLink>
                          </div>
                          <div className="navorder-user">
                              <NavLink to="/user_order">Your order</NavLink>
                          </div>
                      </div>
                      <div className="nav-right">
                        <div className='nav-username'>
                        {usernamecookies}
                        </div>
                        <IoExitOutline 
                        className='icon-user-exit' 
                        size={25} 
                        onClick={logout}
                        />
                    </div>

                    <div className="nav-toggle" onClick={navToggle}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>

                </nav>
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

             

              {data.flight.map(flight => (
                <div className="ticket-user-ticket">
               
                    <div className="ticket-form" key={flight.Fid}>
                         
                            <div className="goto-user-ticket" >
                                เดินทางไปที่ :  {flight.Destination}
                            </div>
        
                            <div className="date-user-ticket">
                                วัน :  {new Date(flight.Fdate).toLocaleDateString()}
                            </div>
                            <div className="time-user-ticket">
                                เวลา : {flight.Ftime}
                            </div>
                        
                            <div className="next">
                            <Link to="/User_flight">จองที่นั่ง</Link>
                            </div>  
                    </div>                      
                </div>
                   ))}
              
          </div>

          </div>
      
  )
}



export default User_ticket
