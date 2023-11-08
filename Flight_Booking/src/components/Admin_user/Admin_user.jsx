import React, { useState } from 'react'
import './Admin_user.css'
import { IoExitOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import axios from 'axios'

function exit(){
    alert('Are you sure to logout !!!')
}

function Admin_user() {

    const [userList, setUserList] = useState([]);

    const getUser = () => {
        axios.get('http://localhost:3333/quantity-user').then((response)=> {
            setUserList(response.data)
        })
    }

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
            <IoExitOutline className='icon-admin-exit' size={25} onClick={exit} />
        </div>
        <section>
            <div className="list-user">
                List User
            </div>

            <button onClick={getUser}>Show User</button>

            {userList.map((val, key) => {
                return(
                    <div className="admin-datauser">
                        <div className="admin-username">
                            Username : {val.username}
                        </div>
                        <div className="admin-name">
                            Name : {val.fname}
                        </div>
                        <div className="admin-surname">
                            Surname : {val.surname}
                        </div>
                        <div className="admin-phone">
                            Phone : {val.phone}
                        </div>
                        <div className="admin-edit" onClick={toggleEdit}>
                            Edit
                        </div>
                        <div className="admin-delete">
                            Delete
                        </div>
                    </div>
                )
            })}

            <div className="admin-add-user" onClick={toggleModal}>
                Add User
            </div>
        </section>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content-user">

                        <h2>Add User</h2>

                        <div className="modal-content-input-user">

                            <div className="modal-content-input-user-1">
                                <div className="modal-content-username">
                                    Username <input type="text" className='modal-input' />
                                </div>
                                <div className="modal-content-username">
                                    Password <input type="password" className='modal-input' />
                                </div>
                                <div className="modal-content-password">
                                    Name <input type="text" className='modal-input-name' />
                                </div>
                            </div>
                            <div className="modal-content-input-user-2">
                                <div className="modal-content-username">
                                    Surname <input type="text" className='modal-input' />
                                </div>
                                <div className="modal-content-username">
                                    Email <input type="email" className='modal-input-email' />
                                </div>
                                <div className="modal-content-password">
                                    Phone <input type="number" className='modal-input-phone' />
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
                <div className="modal-content-user">

                    <h2>Edit User</h2>

                    <div className="modal-content-input-user">

                        <div className="modal-content-input-user-1">
                            <div className="modal-content-username">
                                Username <input type="text" className='modal-input' />
                            </div>
                            <div className="modal-content-username">
                                Password <input type="password" className='modal-input' />
                            </div>
                            <div className="modal-content-password">
                                Name <input type="text" className='modal-input-name' />
                            </div>
                        </div>
                        <div className="modal-content-input-user-2">
                            <div className="modal-content-username">
                                Surname <input type="text" className='modal-input' />
                            </div>
                            <div className="modal-content-username">
                                Email <input type="email" className='modal-input-email' />
                            </div>
                            <div className="modal-content-password">
                                Phone <input type="number" className='modal-input-phone' />
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

export default Admin_user
