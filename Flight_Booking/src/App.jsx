import './App.css'
import {BrowserRouter, NavLink, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import Signin from './components/Signin/Signin';
import Flight from './components/Flight/Flight';
import Ticket from './components/Ticket/Ticket';
import Pay from './components/Pay/Pay';
import Admin_user from './components/Admin_user/Admin_user';
import Admin from './components/Admin/Admin';
import Admin_flight from './components/Admin_flight/Admin_flight';
import User from './components/User/User';
import User_order from './components/User_order/User_order';
import User_ticket from './components/User_ticket/User_ticket';
import User_flight from './components/User_flight/User_flight';
import User_pay from './components/User_pay/User_pay';
import Login_admin from './components/Login_admin/Login_admin';
import Admin_edit from './components/Admin_edit/Admin_edit';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Signin' element={<Signin />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Ticket' element={<Ticket />}></Route>
        <Route path='/Flight' element={<Flight />}></Route>
        <Route path='/Pay' element={<Pay />}></Route>
        <Route path='/Admin_user' element={<Admin_user />}></Route>
        <Route path='/Admin' element={<Admin />}></Route>
        <Route path='/Admin_flight' element={<Admin_flight />}></Route>
        <Route path='/User' element={<User />}></Route>
        <Route path='/User_order' element={<User_order />}></Route>
        <Route path='/User_ticket' element={<User_ticket />}></Route>
        <Route path='/User_flight' element={<User_flight />}></Route>
        <Route path='/User_pay' element={<User_pay />}></Route>
        <Route path='/Login_admin' element={<Login_admin />}></Route>
        <Route path='/Admin_edit/:id' element={<Admin_edit />}></Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
