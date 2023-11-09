import React, { useState, useEffect  } from 'react'
import { Link, NavLink,useNavigate } from 'react-router-dom';
import { IoExitOutline } from 'react-icons/io5'
import './User_pay.css'
import qrcode from './qrcode.png'
import axios from 'axios'

function User_pay() {

    const [navActive, setnavActive] = useState("navcenter-user-pay");
    const navToggle = () => {
        if(navActive==="navcenter-user-pay"){
            setnavActive("navcenter-user-pay nav__active-user-pay"); console.log("active")
        }else{
            setnavActive("navcenter-user-pay"); console.log("no")
        }
    }

    const [Selected, setSelected] = useState('')
    const [selectedDate, setSelectedDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [databill, setDatabill] = useState({flight: []});
    const uniqueData = new Set();

   
      
    const navigate = useNavigate();

    //get name
    const username = localStorage.getItem('username');
    
    
    //function logout
    const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/Login');
    };
    console.log("99999999999999999999999",databill)
    useEffect(() => {
        axios.get('http://localhost:3333/api/user_bill').then((response) => {
            const result =  response.data;
            setDatabill({ 
                flight: result
              });
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
          
    }, []);

    databill.flight.forEach(flight => {
        // เพิ่มข้อมูลลงใน Set
        uniqueData.add(flight);
      });

      const uniqueDataArray = [...uniqueData];

      console.log("8888888888888888888888888",uniqueDataArray)
  
    return (
        <div>
            <div className='Home-pay'>
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
            
               
   
 
  
                <div className="main-user-pay">
                    <div className="content-user-pay">
                        <div className="name-user-pay">
                            <div className="name-data-user-pay">
                                Name
                            </div>
                            <span> {[...new Set(uniqueDataArray.map(flight => flight.fname))]}  {[...new Set(uniqueDataArray.map(flight => flight.surname))]}</span>
                        </div>
                        <hr />
                        <div className="time-fligth">
                            <div className="time-user-pay">
                                <div className="time-data-user-pay">
                                    Time    
                                </div>
                                <span>{[...new Set(uniqueDataArray.map(flight => flight.Ftime))]}</span>
                            </div>
                            <div className="flight-user-pay">
                                <div className="flight-data-user-pay">
                                    Flight
                                </div>
                                <span>{[...new Set(uniqueDataArray.map(flight => flight.Fid))]}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="date-user-pay">
                            <div className="date-data-user-pay">
                                Date
                            </div>
                            <span>{[...new Set(uniqueDataArray.map(flight => flight.Fdate))]}</span>
                        </div>
                        <hr />
                        <div className="to-price-user-pay">
                            <div className="to-user-pay">
                                <div className="to-data-user-pay">
                                    To
                                </div>
                                <span>{[...new Set(uniqueDataArray.map(flight => flight.Destination))]}</span>
                            </div>
                            <div className="price-user-pay">
                                <div className="price-data-user-pay">
                                    Price
                                </div>
                                {uniqueDataArray.length > 0 && (
                                <span>
                                {uniqueDataArray[uniqueDataArray.length - 1]?.price * uniqueDataArray.length}
                                </span>
                                 )}
                            </div>
                        </div>
                        <hr />
                      
                        <div className="seat-user-pay">
                       
                            <div className="seat-data-user-pay">
                                Seat
                            </div>
                            <span> {uniqueDataArray.map(flight => flight.snumber).join(' ')}</span>
                        </div>          
                        <hr />
            
                        <div className="bg-user-pay">
                           <img src={qrcode} alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default User_pay
