import React, { useState, useEffect  } from 'react'
import { Link } from 'react-router-dom'
import { IoExitOutline } from 'react-icons/io5'
import './User.css'
import Dropdown from './Dropdown'
import Airline from './Airline'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function User() {
    //navigate
    const navigate = useNavigate();
    //Logout
    function handleLogout() {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate('/Login');
      }

    const [Selected, setSelected] = useState("")
    const [Airlined, setAirlined] = useState("")
    const username = localStorage.getItem('username');

    //Vertify token
    useEffect(() => {

        const token = localStorage.getItem('token')
        console.log(token);
      
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
                <div className='nav-user'>
                    <div className="logo-user">
                        <Link to="/user">Canfly</Link>
                    </div> 
                    <div className="navcenter-user">
                        <div className="navhome-user">
                            <Link to="/user">Home</Link>
                        </div>
                        <div className="navorder-user">
                            <Link to="/user_order">Your order</Link>
                        </div>
                        <div className="navfav-user">
                            <Link to="/user_favourites">Favourites</Link>
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
                    onClick={handleLogout}
                    />
                </div>
            

                <article>
                    <div className="content">
                    <h1>เริ่มเดินทางได้แล้ววันนี้</h1>
                    <h2>จองเที่ยวบินทั่วโลกสำหรับทริปของคุณด้วยข้อเสนอที่ดีที่สุด</h2>
                    </div>
                </article>

                <div className="dropdown-data">
                    <Dropdown Selected={Selected} setSelected={setSelected}/>
                    <Airline Airlined={Airlined} setAirlined={setAirlined}/>
                </div> 

                <div className="submit">
                    <Link to='/user_ticket'>Search</Link>
                </div>
            </div>
        </div>
    )
}

export default User
