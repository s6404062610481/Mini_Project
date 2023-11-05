import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './User_order.css'
import qrcode2 from './qrcode2.png'
import { IoExitOutline } from 'react-icons/io5'

function User_order() {

    //get name
    const username = localStorage.getItem('username');

    //function logout
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/Login');
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

                <div className="ticket">
                    <div className="ticket-form-user-order">
                        <div className="main-user-order">
                            <div className="content-user-order">
                                <div className="booking-user-order">
                                    <div className="booking-data-user-order">
                                        Booking ID
                                    </div>
                                    <span>1</span>
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
                                    <span>001233</span>
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
                                <span>Puket</span>
                            </div>
                            <div className="des-seat">
                                <div className="dses-seat-data">
                                    Seat
                                </div>
                                <span>B08</span>
                            </div>
                        </div>
                        <div className="date-time-user-order">
                            <div className="date-user-order">
                                <div className="date-data-user-order">
                                    Date
                                </div>
                                <span>01/12/2566</span>
                            </div>
                            <div className="time-user-order">
                                <div className="time-date-user-order">
                                    Time
                                </div>
                                <span>09:30:00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ticket">
                    <div className="ticket-form-user-order">
                        <div className="main-user-order">
                            <div className="content-user-order">
                                <div className="booking-user-order">
                                    <div className="booking-data-user-order">
                                        Booking ID
                                    </div>
                                    <span>1</span>
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
                                    <span>001233</span>
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
                                <span>Puket</span>
                            </div>
                            <div className="des-seat">
                                <div className="dses-seat-data">
                                    Seat
                                </div>
                                <span>B08</span>
                            </div>
                        </div>
                        <div className="date-time-user-order">
                            <div className="date-user-order">
                                <div className="date-data-user-order">
                                    Date
                                </div>
                                <span>01/12/2566</span>
                            </div>
                            <div className="time-user-order">
                                <div className="time-date-user-order">
                                    Time
                                </div>
                                <span>09:30:00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ticket">
                    <div className="ticket-form-user-order">
                        <div className="main-user-order">
                            <div className="content-user-order">
                                <div className="booking-user-order">
                                    <div className="booking-data-user-order">
                                        Booking ID
                                    </div>
                                    <span>1</span>
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
                                    <span>001233</span>
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
                                <span>Puket</span>
                            </div>
                            <div className="des-seat">
                                <div className="dses-seat-data">
                                    Seat
                                </div>
                                <span>B08</span>
                            </div>
                        </div>
                        <div className="date-time-user-order">
                            <div className="date-user-order">
                                <div className="date-data-user-order">
                                    Date
                                </div>
                                <span>01/12/2566</span>
                            </div>
                            <div className="time-user-order">
                                <div className="time-date-user-order">
                                    Time
                                </div>
                                <span>09:30:00</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default User_order
