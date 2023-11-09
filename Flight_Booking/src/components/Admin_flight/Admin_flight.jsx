import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoExitOutline } from 'react-icons/io5'
import './Admin_flight.css'
import Dropdown from '../User/Dropdown'
import axios from 'axios'

function Admin_flight() {

    const [seatList, setSeatList] = useState([])

    const getSeatList = () => {
        axios.get('http://localhost:3333/list-seat').then((response)=> {
            setSeatList(response.data)
        })
    }

    const [Selected, setSelected] = useState('')
    const [selectedDate, setSelectedDate] = useState('');
    const [datalistFlight, setDataListFlight] = useState({flight: []});

    //get value from dropdown
    const handleDropdownChange = (selectedValue) => {
        setSelected(selectedValue);
        // You can now use the selected value in this parent component
        console.log('Selected option in parent component:', selectedValue);
      };
  
      //get data form
      const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);
        console.log('Selected Date:', selectedDate);
        // You can do other things with the selected date here, if needed
      };

      //submit SELECT data 
    const handleSearchClick = async () => { // Mark the function as async
        console.log('handleSearchClick:', Selected);
        console.log('handleSearchClick:', selectedDate);
    
        axios.get('http://localhost:3333/list-seat', {
        params: {
            Destination: Selected,
            fDate: selectedDate,
        }
        })
        .then((response) => {
        const resultdata = response.data;
        setDataListFlight({
            flight: resultdata
        });
        console.log('111111111111111111111111111',response.data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
      };
      console.log("55555555555",datalistFlight)

    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
    
    const toggleEdit = () => {
        setEdit(!edit)
    }

  return (
    <div>
        <div className='admin-nav'>
            <div className="admin-head">
                <div className="canfly">
                    <Link to='/admin'>Canfly</Link>
                </div>
                <div className="admin-topic">
                    <div className="admin-topic-user">
                        <Link to='/admin_user'>User</Link>
                    </div>
                    <div className="admin-topic-flight">
                        <Link to='/admin_flight'>Flight</Link>
                    </div>
                </div>
                <div className="admin">
                    Admin name
                </div>
            </div>
            <IoExitOutline className='icon-admin-exit' size={25} />
        </div>
        <section>
            <div className="list-user">
                List Flight
            </div>
            <div className="dropdown-data-user-ticket">
                  <Dropdown 
                  Selected={Selected} 
                  setSelected={setSelected} 
                  onChange={handleDropdownChange}/>
                    
                  <input type="date" 
                  className='date-input' 
                  onChange={handleDateChange}
                  />
            </div> 
            <div className="submit-user-ticket">
                  <Link 
                  to='/admin_flight' 
                  onClick={handleSearchClick}>Search</Link>
              </div>

                {datalistFlight.flight.map((val, key)=>{
                    return(
                        <tr>
                            <td>{val.Sid}</td>
                            <td>{val.snumber}</td>
                            <td>{val.username}</td>
                        </tr>
                    );
                })}

              {seatList.map((val, key) => {
                return(
                    <div className="admin-datauser">
                    <div className="admin-username">Destination : {val.Destination}</div>
                    <div className="admin-surname">Seat Number : {val.snumber}</div>
                    <div className="admin-surname">Status : {val.status} </div>
                </div>
                );
              })}
            <div className="admin-add-user"  onClick={toggleModal}>
                Add Flight
            </div>
        </section>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content-flight">

                        <h2>Add Flight</h2>

                        <div className="modal-content-input-user">

                            <div className="modal-content-input-user-1">
                                <div className="modal-content-username">
                                    Airline <input type="text" className='modal-input-airline' />
                                </div>
                                <div className="modal-content-password">
                                    Destination <input type="text" className='modal-input' />
                                </div>
                            </div>
                            <div className="modal-content-input-user-2">
                                <div className="modal-content-username">
                                    Date <input type="date" className='modal-input' />
                                </div>
                                <div className="modal-content-password">
                                    Time <input type="time" className='modal-input' />
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-button">
                            <button className='button-add-admin'>Add</button>
                            <button className='button-close-admin' onClick={toggleModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}



            {edit && (
                <div className="modal">
                    <div onClick={toggleEdit} className="overlay"></div>
                    <div className="modal-content-flight">

                        <h2>Edit Flight</h2>

                        <div className="modal-content-input-user">

                            <div className="modal-content-input-user-1">
                                <div className="modal-content-username">
                                    Airline <input type="text" className='modal-input-airline' />
                                </div>
                                <div className="modal-content-password">
                                    Destination <input type="text" className='modal-input' />
                                </div>
                            </div>
                            <div className="modal-content-input-user-2">
                                <div className="modal-content-username">
                                    Date <input type="date" className='modal-input' />
                                </div>
                                <div className="modal-content-password">
                                    Time <input type="time" className='modal-input' />
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-button">
                            <button className='button-edit-admin'>Edit</button>
                            <button className='button-close-admin' onClick={toggleEdit}>Close</button>
                        </div>
                    </div>
                </div>
            )}

    </div>
  )
}

export default Admin_flight
