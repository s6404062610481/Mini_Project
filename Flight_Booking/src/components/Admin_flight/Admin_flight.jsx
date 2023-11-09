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
        setIsLoading(true);
    
        try {
          const response = await axios.get('http://localhost:3333/api/flight', {
            params: {
              destination: Selected,
              fdate: selectedDate,
            }
          });
          // Handle and display the data in your React app
          console.log(response.data);
          const result = await response.data;
          console.log('result is: ', JSON.stringify(result, null, 4));
          
         setData({ 
          flight: result
        });
   
        } catch (error) {
          console.error('Error:', error);
        }finally {
          setIsLoading(false);
        }
      };

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
             
                  />
            </div> 
            <div className="submit-user-ticket">
                  <Link 
                  to='/admin_flight' 
                  onClick={handleSearchClick}>Search</Link>
              </div>
              <button onClick={getSeatList}>Seat</button>

              {seatList.map((val, key) => {
                console.log('ff')
                return(
                        <tr>
                            <td>{val.Destination}</td>
                            <td>{val.snumber}</td>
                            <td>{val.status}</td>
                        </tr>
                );
              })}
              <div className="admin-datauser">
                        <div className="admin-username">Destination :</div>
                        <div className="admin-surname">Seat Number :</div>
                        <div className="admin-surname">Status : </div>
                    </div>
            <div className="admin-datauser">
                <div className="admin-username">
                    Airline : Nokair
                </div>
                <div className="admin-name">
                    Destination : Puket
                </div>
                <div className="admin-surname">
                    Date : 2566-12-01
                </div>
                <div className="admin-phone">
                    Time : 09:30:00
                </div>
                <div className="admin-edit" onClick={toggleEdit}>
                    Edit
                </div>
                <div className="admin-delete">
                    Delete
                </div>
            </div>
            <div className="admin-datauser">
                <div className="admin-username">
                    Airline : Nokair
                </div>
                <div className="admin-name">
                    Destination : Puket
                </div>
                <div className="admin-surname">
                    Date : 2566-12-01
                </div>
                <div className="admin-phone">
                    Time : 09:30:00
                </div>
                <div className="admin-edit" onClick={toggleEdit}>
                    Edit
                </div>
                <div className="admin-delete">
                    Delete
                </div>
            </div>
            <div className="admin-datauser">
                <div className="admin-username">
                    Airline : Nokair
                </div>
                <div className="admin-name">
                    Destination : Puket
                </div>
                <div className="admin-surname">
                    Date : 2566-12-01
                </div>
                <div className="admin-phone">
                    Time : 09:30:00
                </div>
                <div className="admin-edit" onClick={toggleEdit}>
                    Edit
                </div>
                <div className="admin-delete">
                    Delete
                </div>
            </div>
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
