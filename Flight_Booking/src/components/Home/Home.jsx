import React, { useEffect,useState } from 'react'
import './Home.css'
import { Link, NavLink,useNavigate } from 'react-router-dom'
import { IoExitOutline } from 'react-icons/io5'
import Dropdown from '../User/Dropdown'
import axios from 'axios';

const Home = () => {

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
          alert('Authen successful ');
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
    <>
    <div>
            <div className='Home'>
                <div className='nav-user'>
                    <div className="logo">
                        <Link to="/">Canfly</Link>
                    </div> 
                    <div className="navcenter">
                        <div className="navhome">
                            <NavLink to="/">Home</NavLink>
                        </div>
                        <div className="navorder">
                            <NavLink to="/">Your order</NavLink>
                        </div>
                    </div>
                    <div className="in">
                      <div className='sign'>
                        <Link to="/Signin">SIGN IN</Link>
                      </div>
                      <div className='log'>
                        <Link to="/Login">LOG IN</Link>
                      </div>
                  </div>
                </div>
            

                <article>
                    <div className="content">
                    <h1>เริ่มเดินทางได้แล้ววันนี้</h1>
                    <h2>จองเที่ยวบินทั่วโลกสำหรับทริปของคุณด้วยข้อเสนอที่ดีที่สุด</h2>
                    </div>
                </article>

                <div className="submit">
                    <Link to='/ticket' >Search</Link>
                </div>
            </div>
        </div>

    
    </>
  )
}

export default Home
