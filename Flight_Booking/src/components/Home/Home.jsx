import React, { useEffect , useState } from 'react'
import './Home.css'
import { Link, NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios';

/* <div className='nav'>
        <div className="logo">
          <Link to="/">Canfly</Link>
        </div> 
        <div className="navcenter">
          <div className="navhome">
            <Link to="/">Home</Link>
          </div>
          <div className="navorder">
            <Link to="/">Your order</Link>
          </div>
          <div className="navfav">
            <Link to="/">Favourites</Link>
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
*/
const Home = () => {
  const navigate = useNavigate();

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
    <div className='Home'>
      <nav>
        <div className="logo">
            <Link to="/">Canfly</Link>
        </div> 
        <div className="navcenter">
            <div className="navhome">
                <Link to="/">Home</Link>
            </div>
            <div className="navorder">
                <Link to="/">Your order</Link>
            </div>
            <div className="navfav">
                <Link to="/">Favourites</Link>
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
      </nav>

        <article>
            <div className="content">
            <h1>เริ่มเดินทางได้แล้ววันนี้</h1>
            <h2>จองเที่ยวบินทั่วโลกสำหรับทริปของคุณด้วยข้อเสนอที่ดีที่สุด</h2>
            </div>
        </article>

        <div className="datainput">
            <input type="text" className='inputwhere' placeholder='เดินทางไปที่ไหน'/>
            <input type="text" className='inputwhere' placeholder='วัน'/>
        </div>      
        <div className="submit">
          <Link to='/Ticket'>Search</Link>
          
        </div>
       
    </div>

    
    </>
  )
}

export default Home
