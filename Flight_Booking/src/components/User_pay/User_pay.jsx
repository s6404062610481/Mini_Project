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
            </div>
        </div>
    )
}

export default User_pay
