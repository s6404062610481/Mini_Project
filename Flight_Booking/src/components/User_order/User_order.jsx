import React, { useState,useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './User_order.css'
import qrcode2 from './qrcode2.png'
import { IoExitOutline } from 'react-icons/io5'
import axios from 'axios'

function User_order() {

    const [navActive, setnavActive] = useState("navcenter-user-order");
    const navToggle = () => {
        if(navActive==="navcenter-user-order"){
            setnavActive("navcenter-user-order nav__active-user-order"); console.log("active")
        }else{
            setnavActive("navcenter-user-order"); console.log("no")
        }
    }

    //get name
    const username = localStorage.getItem('username');

    const [data, setData] = useState({flight: []});

    //function logout
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/Login');
    };
    
   
    useEffect(() => {
        
      const token = localStorage.getItem('token')
      console.log(token);

      axios.get('http://localhost:3333/api/flightbooking', {
        params: {
            username: username ,
          }
        })
        .then((response) => {
        const result = response.data;
        setData({ 
            flight: result
        });
        console.log(response);
        })
        .catch((error) => {
        // Handle errors
        });
            

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Specify the content type if needed
        },
      };
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
      }, []);
    
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
                        {username}
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

      
                {data.flight.map(flight => (
                <div className="ticket" key={flight.Fid}>
                    <div className="ticket-form-user-order">
                        <div className="main-user-order">
                            <div className="content-user-order">
                                <div className="booking-user-order">
                                    <div className="booking-data-user-order">
                                        Booking ID
                                    </div>
                                    <span>{flight.BookingID}</span>
                                </div>
                                <div className="name-flight">
                                    <div className="name-flight-data-user-order">
                                        FLIGHT INFORMATION
                                    </div>
                                </div>
                                <div className="flight-id">
                                    <div className="flight-id-data">
                                        Flight ID
                                    </div>
                                    <span>{flight.FlightID}</span>
                                </div>
                            </div>

                            <div className="img-user-order">
                                <div className="img-data-user-order">
                                    <img src={qrcode2} alt="" />
                                </div>
                            </div>
                        </div>
                        <hr className='hr-user-order' />
                        <div className="destination">
                            <div className="des-to">
                                <div className="des-to-data">
                                    To
                                </div>
                                <span>{flight.FlightDestination}</span>
                            </div>
                            <div className="des-seat">
                                <div className="dses-seat-data">
                                    Seat
                                </div>
                                <span>{flight.SeatNumber}</span>
                            </div>
                        </div>
                        <div className="date-time-user-order">
                            <div className="date-user-order">
                                <div className="date-data-user-order">
                                    Date
                                </div>
                                <span>{new Date(flight.FlightDate).toLocaleDateString()}</span>
                            </div>
                            <div className="time-user-order">
                                <div className="time-date-user-order">
                                    Time
                                </div>
                                <span>{flight.FlightTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
                    ))}
    

            </div>
        </div>
    )
}

export default User_order
