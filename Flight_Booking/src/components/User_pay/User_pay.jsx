import React, { useState,useEffect  } from 'react'
import { MdEventSeat } from 'react-icons/md';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import { IoExitOutline } from 'react-icons/io5'
import Axios from 'axios';

function User_pay() {
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
                            </div>
                        </div>
                        <IoExitOutline 
                        className='icon-user-exit' 
                        size={25} 
                        />
                </div>

                <div className="main-user-pay">
                    <div className="content-user-pay">
                        <div className="name-user-pay">
                            Name : <span>Tanawat Kama</span>
                        </div>
                        <div className="time-fligth">
                            <div className="time-user-pay">
                                Time : <span>09:30:00</span>
                            </div>
                            <div className="flight-user-pay">
                                Flight : <span>A0233</span>
                            </div>
                        </div>
                        <div className="Date">
                            Date : <span>01/12/2565</span>
                        </div>
                        <div className="to-price">
                            <div className="to">
                                To : <span>Puket</span>
                            </div>
                            <div className="price">
                                Price : <span>1300 Bath</span>
                            </div>
                        </div>
                        <div className="seat-user-pay">
                            Seat : <span>B09</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default User_pay
