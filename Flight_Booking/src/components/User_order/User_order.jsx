import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './User_order.css'

function User_order() {
    
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
                            User name
                        </div>
                    </div>
                </div>

                <div className="ticket">
                    <div className="ticket-form-user-order">
                        <div className="goto">
                            ID : 1
                        </div>
                        <div className="date">
                            Airline : Nokair
                        </div>
                        <div className="date">
                            Destination : Puket
                        </div>
                        <div className="date">
                            Date : 01/11/2024
                        </div>
                        <div className="time">
                            Time : 09:30:00
                        </div>
                        <div className="time">
                            Seat : A1
                        </div>
                        <div className="time">
                            Price : 1300 Bath
                        </div>
                    </div>
                </div>
                <div className="ticket">
                    <div className="ticket-form-user-order">
                        <div className="goto">
                            ID : 1
                        </div>
                        <div className="date">
                            Airline : Nokair
                        </div>
                        <div className="date">
                            Destination : Puket
                        </div>
                        <div className="date">
                            Date : 01/11/2024
                        </div>
                        <div className="time">
                            Time : 09:30:00
                        </div>
                        <div className="time">
                            Seat : A1
                        </div>
                        <div className="time">
                            Price : 1300 Bath
                        </div>
                    </div>
                </div>
                <div className="ticket">
                    <div className="ticket-form-user-order">
                        <div className="goto">
                            ID : 1
                        </div>
                        <div className="date">
                            Airline : Nokair
                        </div>
                        <div className="date">
                            Destination : Puket
                        </div>
                        <div className="date">
                            Date : 01/11/2024
                        </div>
                        <div className="time">
                            Time : 09:30:00
                        </div>
                        <div className="time">
                            Seat : A1
                        </div>
                        <div className="time">
                            Price : 1300 Bath
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default User_order
