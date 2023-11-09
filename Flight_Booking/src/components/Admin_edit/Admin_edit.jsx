import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Admin_edit() {

    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:3333/update-user/'+id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="modal">
                <div className="modal-content-user">

                    <h2>Edit User</h2>

                    <div className="modal-content-input-user">

                        <div className="modal-content-input-user-1">
                            <div className="modal-content-username">
                                Username <input type="text" className='modal-input' onChange={(event) => {
                                    setNewUsername(event.target.value)
                                }}/>
                            </div>
                            <div className="modal-content-username">
                                Password <input type="password" className='modal-input' onChange={(event) => {
                                    setNewPassword(event.target.value)
                                }}/>
                            </div>
                            <div className="modal-content-password">
                                Name <input type="text" className='modal-input-name' onChange={(event) => {
                                    setNewName(event.target.value)
                                }}/>
                            </div>
                        </div>
                        <div className="modal-content-input-user-2">
                            <div className="modal-content-username">
                                Surname <input type="text" className='modal-input' onChange={(event) => {
                                    setNewSurname(event.target.value)
                                }}/>
                            </div>
                            <div className="modal-content-username">
                                Email <input type="email" className='modal-input-email' onChange={(event) => {
                                    setNewEmail(event.target.value)
                                }}/>
                            </div>
                            <div className="modal-content-password">
                                Phone <input type="number" className='modal-input-phone' onChange={(event) => {
                                    setNewPhone(event.target.value)
                                }}/>
                            </div>
                        </div>
                        
                    </div>
                    <div className="modal-button">
                        <button className='button-edit-admin'>Edit</button>
                        <button className='button-close-admin'>Close</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Admin_edit
