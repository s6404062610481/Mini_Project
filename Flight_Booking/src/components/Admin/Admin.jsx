import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoExitOutline } from 'react-icons/io5'
import './Admin.css'
import axios from 'axios'

function Admin() {

    const [adminList, setAdminList] = useState([])

    const getAdmin = () => {
        axios.get('http://localhost:3333/quantity-admin').then((response)=> {
            setAdminList(response.data)
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
                <IoExitOutline className='icon-admin-exit' size={25} />
            </div>

            <section>
                <div className="list-user">
                    List Admin
                </div>
                <button onClick={getAdmin} className='admin-add-admin'>Show Admin</button>
                
                {adminList.map((val, key) => {
                return (
                    <div className="admin-datauser">
                        <div className="admin-username">
                            Username : {val.username}
                        </div>
                        <div className="admin-name">
                            Password : {val.password}
                        </div>
                        <div className="admin-surname">
                            Surname : Gaga
                        </div>
                        <div className="admin-phone">
                            Phone : 0123456789
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
                <div className="admin-add-admin" onClick={toggleModal}>
                    Add Admin
                </div>
            </section>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div className="modal-content-input">
                            <h2>Add Admin</h2>
                            <div className="modal-content-username">
                                Username <input type="text" className='modal-input' />
                            </div>
                            <div className="modal-content-password">
                                Password <input type="password" className='modal-input' />
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
                    <div className="modal-content">
                        <div className="modal-content-input">
                            <h2>Edit Admin</h2>
                            <div className="modal-content-username">
                                Username <input type="text" className='modal-input' />
                            </div>
                            <div className="modal-content-password">
                                Password <input type="password" className='modal-input' />
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

export default Admin
