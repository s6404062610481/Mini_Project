import './App.css'
import {BrowserRouter, NavLink, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import Signin from './components/Signin/Signin';
import Flight from './components/Flight/Flight';
import Ticket from './components/Ticket/Ticket';
import Pay from './components/Pay/Pay';
import Admin from './components/Admin/Admin';
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
        <Route path='/Admin' element={<Admin />}></Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
