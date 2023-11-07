import React, { useState,useEffect  } from 'react'
import { MdEventSeat } from 'react-icons/md';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import { IoExitOutline } from 'react-icons/io5'
import axios from 'axios';
import './User_flight.css'



function User_flight() {

  const [navActive, setnavActive] = useState("navcenter-user-flight");
  const navToggle = () => {
    if (navActive === "navcenter-user-flight") {
      setnavActive("navcenter-user-flight nav__active-user-flight"); console.log("active")
    } else {
      setnavActive("navcenter-user-flight"); console.log("no")
    }
  }

  
    const [usernamecookies, setUsernamecookies] = useState(''); 

    const navigate = useNavigate();

    //get name
    const username = localStorage.getItem('username');

  //function logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    deleteCookie("username");
    navigate('/Login');
  };

    
  // *********************//
  const [selectedSeats, setSelectedSeats] = useState([]); //ที่นั่ง ปจบ
  const [selectedAndReservedSeats, setSelectedAndReservedSeats] = useState([]);
  const [selectedAndReservedSeatsAfterNext, setSelectedAndReservedSeatsAfterNext] = useState([]);
  const [datastatus, setDatastatus] = useState({ status: [] });
  

  const handleSeatClick = (seatNumber) => {
    // เช็คว่าที่นั่งถูกเลือกบ่
    if (selectedSeats.includes(seatNumber)) {
      // ถ้าถูกเลือกอยู่แล้ว ให้ลบที่นั่งออกจาก selectedSeats
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      // ถ้ายังไม่ถูกเลือก ให้เพิ่มที่นั่งเข้า selectedSeats
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
 
  ////////////เมื่อไหร่จะได้ไอ้แม่ย้อยยยยยยยย///////////

  const [status, setStatus] = useState(false);

  const handleNextClick = () => {
    if (selectedSeats.length > 0) {
      // ทำการอัปเดตสถานะเป็น true
      setStatus(true);
      console.log("Success");

      // ทำการเรียกใช้ API เพื่ออัปเดตสถานะที่นั่งที่ถูกเลือก
      selectedSeats.forEach(seatNumber => {
        axios.post('http://localhost:3333/reserve-seat', { seatNumber })
          .then(response => {
            console.log(response.data);
            // ทำตามการตอบกลับจาก api
          })
          .catch(error => {
            console.error(error);
          });
      });

      // อัปเดต state selectedAndReservedSeatsAfterNext
      setSelectedAndReservedSeatsAfterNext(selectedSeats.concat(selectedAndReservedSeats));
    } else {
      console.log("Please select a seat.");
    }
  };
  
    //delete cookie
    function deleteCookie(name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

  useEffect(() => {

    axios.get('http://localhost:3333/check-seat')
      .then((response) => {
        const result = response.data;
        setDatastatus({
          status: result
        });
        console.log(response);
      })
      .catch((error) => {
        // handle errors
      });
    //get cookies
    function getCookie(name) {
      const cookies = document.cookie.split('; ');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null; // หากไม่พบคูกกี้ที่ต้องการ
    }
    const usernamecookies = getCookie('username');
    setUsernamecookies(usernamecookies);

    // ตรวจสอบว่ามีข้อมูลที่นั่งที่ถูกเลือกใน localStorage หรือไม่
    const storedSelectedSeats = localStorage.getItem('selectedSeats');
    if (storedSelectedSeats) {
      // ถ้ามี ให้แปลงข้อมูล JSON เป็น array และอัปเดตใน state
      setSelectedSeats(JSON.parse(storedSelectedSeats));
    }
  }, []); // ใส่วงเล็บว่างเพื่อให้ useEffect ทำงานเพียงครั้งเดียวหลังจากการเรียกใช้ครั้งแรก
    
    // ใช้เข้าถึงนะจระคนดี
   
 for(let i =0 ; i<datastatus.status.length;i++){
  console.log(datastatus.status[i]);
 }

  return (
    <div>
        <div className='Home'>
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
                    {usernamecookies}
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


            <div className="seat_main_1-user-ticket">
          {/* red */}
    {/*         
              <div className="seat_1">
      <div className="A">A</div>
      {[1, 2, 3, 4, 5].map(seatNumber => (
        <div
          key={`A${seatNumber}`}
          className={`seat ${selectedSeats.includes(`A${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`A${seatNumber}`) ? 'seat-reserved' : (status === 1 ? 'seat-gray' : '')}`}
          onClick={() => handleSeatClick(`A${seatNumber}`)}
        >
          <MdEventSeat color={(selectedSeats.includes(`A${seatNumber}`) || selectedAndReservedSeats.includes(`A${seatNumber}`) || status === 1) ? 'gray' : 'red'} size={'40'} />
        </div>
      ))}
    </div> */}

          
    <div className="seat_1">
          <div className="A">A</div>
          {[1, 2, 3, 4, 5].map(seatNumber => (
              <div
                key={`A${seatNumber}`}
                className={`seat ${selectedSeats.includes(`A${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`A${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`A${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`A${seatNumber}`) || selectedAndReservedSeats.includes(`A${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
        </div>
              
          {/* blue */}
           <div className="seat_2">
            {[6, 7, 8, 9, 10].map(seatNumber => (
              <div
                key={`A${seatNumber}`}
                className={`seat ${selectedSeats.includes(`A${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`A${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`A${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`A${seatNumber}`) || selectedAndReservedSeats.includes(`A${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>

          {/* red */}
          <div className="seat_3">
            {[11, 12, 13, 14, 15,].map(seatNumber => (
              <div
                key={`A${seatNumber}`}
                className={`seat ${selectedSeats.includes(`A${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`A${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`A${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`A${seatNumber}`) || selectedAndReservedSeats.includes(`A${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>
        </div>


        <div className="seat_main_2">
          {/* red */}
          <div className="seat_1_main_2">
            <div className="B">B</div>
            {[1, 2, 3, 4, 5].map(seatNumber => (
              <div
                key={`B${seatNumber}`}
                className={`seat ${selectedSeats.includes(`B${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`B${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`B${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`B${seatNumber}`) || selectedAndReservedSeats.includes(`B${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>

          {/* blue */}
          <div className="seat_2_main_2">
            {[6, 7, 8, 9, 10].map(seatNumber => (
              <div
                key={`B${seatNumber}`}
                className={`seat ${selectedSeats.includes(`B${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`B${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`B${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`B${seatNumber}`) || selectedAndReservedSeats.includes(`B${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>

          {/* red */}
          <div className="seat_3_main_2">
            {[11, 12, 13, 14, 15].map(seatNumber => (
              <div
                key={`B${seatNumber}`}
                className={`seat ${selectedSeats.includes(`B${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`B${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`B${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`B${seatNumber}`) || selectedAndReservedSeats.includes(`B${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>

        </div>

        <div className="seat_main_3">
          {/* red */}
          <div className="seat_1_main_3">
            <div className="C">C</div>
            {[1, 2, 3, 4, 5].map(seatNumber => (
              <div
                key={`C${seatNumber}`}
                className={`seat ${selectedSeats.includes(`C${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`C${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`C${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`C${seatNumber}`) || selectedAndReservedSeats.includes(`C${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>


          {/* blue */}
          <div className="seat_2_main_3">
            {[6, 7, 8, 9, 10].map(seatNumber => (
              <div
                key={`C${seatNumber}`}
                className={`seat ${selectedSeats.includes(`C${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`C${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`C${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`C${seatNumber}`) || selectedAndReservedSeats.includes(`C${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>


          {/* red */}
          <div className="seat_3_main_3">
            {[11, 12, 13, 14, 15].map(seatNumber => (
              <div
                key={`C${seatNumber}`}
                className={`seat ${selectedSeats.includes(`C${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`C${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`C${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`C${seatNumber}`) || selectedAndReservedSeats.includes(`C${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>

        </div>

        <div className="seat_main_4">
          {/* red */}
          <div className="seat_1_main_4">
            <div className="D">D</div>
            {[1, 2, 3, 4, 5].map(seatNumber => (
              <div
                key={`D${seatNumber}`}
                className={`seat ${selectedSeats.includes(`D${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`D${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`D${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`D${seatNumber}`) || selectedAndReservedSeats.includes(`D${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>

          {/* blue */}
          <div className="seat_2_main_4">
            {[6, 7, 8, 9, 10].map(seatNumber => (
              <div
                key={`D${seatNumber}`}
                className={`seat ${selectedSeats.includes(`D${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`D${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`D${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`D${seatNumber}`) || selectedAndReservedSeats.includes(`D${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>

          {/* red */}
          <div className="seat_3_main_4">
            {[11, 12, 13, 14, 15].map(seatNumber => (
              <div
                key={`D${seatNumber}`}
                className={`seat ${selectedSeats.includes(`D${seatNumber}`) ? 'seat-selected' : selectedAndReservedSeats.includes(`D${seatNumber}`) ? 'seat-reserved' : ''}`}
                onClick={() => handleSeatClick(`D${seatNumber}`)}
              >
                <MdEventSeat color={(selectedSeats.includes(`D${seatNumber}`) || selectedAndReservedSeats.includes(`D${seatNumber}`)) ? 'blue' : 'red'} size={'40'} />
              </div>
            ))}
          </div>
        
        </div> 
        

        <div className="seat_main_5-user-ticket">
          <div className="seat_1_main_5-user-ticket">
            <div className="seat_left_1_main_5-user-ticket">
              1
            </div>
            <div className="seat_left_1_main_5-user-ticket">
              2
            </div>
            <div className="seat_left_1_main_5-user-ticket">
              3
            </div>
            <div className="seat_left_1_main_5-user-ticket">
              4
            </div>
            <div className="seat_left_1_main_5-user-ticket">
              5
            </div>
          </div>
          <div className="seat_2_main_5-user-ticket">
            <div className="seat_mid_1_main_5-user-ticket">
              6
            </div>
            <div className="seat_mid_1_main_5-user-ticket">
              7
            </div>
            <div className="seat_mid_1_main_5-user-ticket">
              8
            </div>
            <div className="seat_mid_1_main_5-user-ticket">
              9
            </div>
            <div className="seat_mid_1_main_5-user-ticket">
              10
            </div>
          </div>
          <div className="seat_3_main_5-user-ticket">
            <div className="seat_right_1_main_5-user-ticket">
              11
            </div>
            <div className="seat_right_1_main_5-user-ticket">
              12
            </div>
            <div className="seat_right_1_main_5-user-ticket">
              13
            </div>
            <div className="seat_right_1_main_5-user-ticket">
              14
            </div>
            <div className="seat_right_1_main_5-user-ticket">
              15
            </div>
          </div>
        </div>
        <div className="btn">
            <div className="btn-main">
            <Link to='/user_ticket'>Back</Link>
            <Link to='/user_pay'onClick={handleNextClick}>Next</Link>
            </div>
        </div>

      </div>
    </div>

  )
}

export default User_flight
