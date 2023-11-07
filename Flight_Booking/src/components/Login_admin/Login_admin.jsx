import React from 'react'
import './Login_admin.css'

function Login_admin() {
    return (
        <div>
            <div className="main-login-admin">
                <div className="content-login-admin">
                    <h2>Login Admin</h2>
                    <div className="username-login-admin">
                        Username <input type="text" />
                    </div>
                    <div className="password-login-admin">
                        Password <input type="password" />
                    </div>
                    <button className='btn-login-admin'>Login</button>
                </div>
            </div>
        </div>  
    )
}

export default Login_admin
