import React, { useState } from 'react'
import './Admin_user.css'
import { IoExitOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import axios from 'axios'

function exit(){
    alert('Are you sure to logout !!!')
}

function Admin_user() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fname, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(0)

    const [editId, setEditId] = useState(-1)

    const [newusername, setNewUsername] = useState('')
    const [newpassword, setNewPassword] = useState('')
    const [newfname, setNewName] = useState('')
    const [newsurname, setNewSurname] = useState('')
    const [newemail, setNewEmail] = useState('')
    const [newphone, setNewPhone] = useState(0)

    const [userList, setUserList] = useState([]);

    const getUser = () => {
        axios.get('http://localhost:3333/quantity-user').then((response)=> {
            setUserList(response.data)
        })
    }

    const addUser = () => {
        axios.post('http://localhost:3333/add-user', {
            username: username,
            password: password,
            fname: fname,
            surname: surname,
            email: email,
            phone: phone
        }).then(() => {
            setUserList([
                ...userList,
            {
                username: username,
                password: password,
                fname: fname,
                surname: surname,
                email: email,
                phone: phone
            }
            ])
        })
    }

    const handleEdit = (id) => {
        setEditId(id);
    }

    const handleUpdateUser = () => {
        axios.put('http://localhost:3333/update-user/'+editId, {
            username: editId,
            password: newpassword,
            fname: newfname,
            surname: newsurname,
            email: newemail,
            phone: newphone
        }).then(res=>{
            console.log(res);
            location.reload();
            setEditId(-1);
        }).catch(err => console.log(err))
    }

    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    const toggleEdit = () => {
        setEdit(edit)
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
                        <Link className="admin-edit" to={`/update-user/${val.username}`}>
                            Edit
                        </Link>
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
                                    Username <input type="text" className='modal-input' onChange={(event)=> {
                                        setUsername(event.target.value);
                                    }}/>
                                </div>
                                <div className="modal-content-username">
                                    Password <input type="text" className='modal-input' onChange={(event)=> {
                                        setPassword(event.target.value);
                                    }}/>
                                </div>
                                <div className="modal-content-password">
                                    Name <input type="text" className='modal-input-name'onChange={(event)=> {
                                        setName(event.target.value);
                                    }} />
                                </div>
                            </div>
                            <div className="modal-content-input-user-2">
                                <div className="modal-content-username">
                                    Surname <input type="text" className='modal-input'onChange={(event)=> {
                                        setSurname(event.target.value);
                                    }} />
                                </div>
                                <div className="modal-content-username">
                                    Email <input type="text" className='modal-input-email' onChange={(event)=> {
                                        setEmail(event.target.value);
                                    }}/>
                                </div>
                                <div className="modal-content-password">
                                    Phone <input type="number" className='modal-input-phone' onChange={(event)=> {
                                        setPhone(event.target.value);
                                    }}/>
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-button">
                            <button className='button-add-admin' onClick={addUser}>Add</button>
                            <button className='button-close-admin' onClick={toggleModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

    </div>
  )
}

export default Admin_user
