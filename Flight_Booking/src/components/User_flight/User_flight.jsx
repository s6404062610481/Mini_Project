import React, { useState, useEffect } from 'react'
import { MdEventSeat } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoExitOutline } from 'react-icons/io5'
import axios from 'axios';
import Dropdown from '../User/Dropdown'
import './User_flight.css'

const seats = Array.from({ length: 15 }, (_, index) => `A${index + 1}`);

function User_flight() {

  const [navActive, setnavActive] = useState("navcenter-user-flight");
  const navToggle = () => {
    if (navActive === "navcenter-user-flight") {
      setnavActive("navcenter-user-flight nav__active-user-flight"); console.log("active")
    } else {
      setnavActive("navcenter-user-flight"); console.log("no")
    }
  }

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

      // อัปเดต state `selectedAndReservedSeatsAfterNext`
      setSelectedAndReservedSeatsAfterNext(selectedSeats.concat(selectedAndReservedSeats));
    } else {
      console.log("Please select a seat.");
    }
  };
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

  }, []);
  console.log("kuy", datastatus);


  const displayLocations = () => {
    return datastatus.map((status, index) => (
      <div key={index}>
        <p>Location {index + 1}: {status}</p>
      </div>
    ));
  };
 

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

        <div className="dropdown-data-user-ticket">
          <Dropdown
            Selected={Selected}
            setSelected={setSelected}
            onChange={handleDropdownChange} />

          <input type="date"
            className='date-input'
            onChange={handleDateChange}

          />
        </div>
        {/*{data.status.map((item) => {
          if (item.status === 'ตัวแปรตัว') {


          })*/}
          
        <div className="seat_main_1-user-ticket">
          {/* red */}
        
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
            <Link to='/user' onClick={handleNextClick}>Back</Link>
            <Link to='/user_pay' onClick={handleNextClick}>Next</Link>
          </div>
        </div>

      </div>
    </div>

  )
}

export default User_flight
