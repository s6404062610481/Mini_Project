import React, { useEffect,useState } from 'react'
import { Link, NavLink,useNavigate  } from 'react-router-dom'
import { IoExitOutline } from 'react-icons/io5'
import './User.css'
import Dropdown from './Dropdown'
import axios from 'axios';

function User() {

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
            

                <article>
                    <div className="content">
                    <h1>เริ่มเดินทางได้แล้ววันนี้</h1>
                    <h2>จองเที่ยวบินทั่วโลกสำหรับทริปของคุณด้วยข้อเสนอที่ดีที่สุด</h2>
                    </div>
                </article>

                <div className="dropdown-data">
                    <Dropdown 
                    Selected={Selected} 
                    setSelected={setSelected} 
                    onChange={handleDropdownChange}/>
                      
                    <input type="date" 
                    className='date-input' 
                    onChange={handleDateChange}
               
                    />
                </div> 

                <div className="submit">
                    <Link 
                    to='/Ticket' 
                    onClick={handleSearchClick}>Search</Link>
                </div>
            </div>
        </div>
    )
}

export default User