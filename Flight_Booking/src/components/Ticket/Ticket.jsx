import React, { useEffect,useState } from 'react'
import './Ticket.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Ticket() {
    const username = localStorage.getItem('username');
    // const Selected = localStorage.getItem('Selected');
    // const Date = localStorage.getItem('Date');
    // const [responseData, setResponseData] = useState([]);



    // useEffect(() => {
    //     axios.get('http://localhost:3333/api/flight', {
    //     params: {
    //       destination: Selected,
    //       fdate: Date
    //     }
    //   })
    //   .then((response) => {
    //     // Handle and display the data in your React app
    //     console.log(response.data);
    //     setResponseData(response.data)
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    //   }, [Selected, Date]);

  return (
    <div>
        <div className='Home'>
            <div className='nav'>
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
          
            <form action="" method="post">
                <div className="datainput">
                    <input type="text" className='inputwhere' placeholder='เดินทางไปที่ไหน'/>
                    <input type="text" className='inputwhere' placeholder='วัน'/>
                    <input type="text" className='inputwhere' placeholder='เวลา'/>
                </div>
                <div className="submit">
                    <Link to='/Ticket'>Search</Link>
                </div>
            </form>
            <div className="ticket">
                <div className="ticket-form">
                        <div className="goto">
                            เดินทางไปที่ : Thailand 
                        </div>
                        <div className="date">
                            วัน : 01/12/2024
                        </div>
                        <div className="time">
                            เวลา : 09:00 น.
                        </div>
                        <div className="next">
                        <Link to="/Flight">จองที่นั่ง</Link>
                        </div>
                </div>
            </div> 
            <div className="ticket">
                <div className="ticket-form">
                        <div className="goto">
                            เดินทางไปที่ : Thailand 
                        </div>
                        <div className="date">
                            วัน : 01/12/2024
                        </div>
                        <div className="time">
                            เวลา : 09:00 น.
                        </div>
                        <div className="next">
                            <Link to="/Flight">จองที่นั่ง</Link>
                        </div>
                </div>
            </div> 
            <div className="ticket">
                <div className="ticket-form">
                        <div className="goto">
                            เดินทางไปที่ : Thailand 
                        </div>
                        <div className="date">
                            วัน : 01/12/2024
                        </div>
                        <div className="time">
                            เวลา : 09:00 น.
                        </div>
                        <div className="next">
                            <Link to="/Flight">จองที่นั่ง</Link>
                        </div>
                </div>
            </div> 
            <div className="ticket">
                <div className="ticket-form">
                        <div className="goto">
                            เดินทางไปที่ : Thailand 
                        </div>
                        <div className="date">
                            วัน : 01/12/2024
                        </div>
                        <div className="time">
                            เวลา : 09:00 น.
                        </div>
                        <div className="next">
                            <Link to="/Flight">จองที่นั่ง</Link>
                        </div>
                </div>
            </div> 
            <div className="ticket">
                <div className="ticket-form">
                        <div className="goto">
                            เดินทางไปที่ : Thailand 
                        </div>
                        <div className="date">
                            วัน : 01/12/2024
                        </div>
                        <div className="time">
                            เวลา : 09:00 น.
                        </div>
                        <div className="next">
                            <Link to="/Flight">จองที่นั่ง</Link>
                        </div>
                </div>
            </div> 
            <div className="ticket">
                <div className="ticket-form">
                        <div className="goto">
                            เดินทางไปที่ : Thailand 
                        </div>
                        <div className="date">
                            วัน : 01/12/2024
                        </div>
                        <div className="time">
                            เวลา : 09:00 น.
                        </div>
                        <div className="next">
                            <Link to="/Flight">จองที่นั่ง</Link>
                        </div>
                </div>
            </div> 

            <div className="btn-main">
                <Link to='/'>Back</Link>
        </div>

        </div>

    </div>
  )
}

export default Ticket
