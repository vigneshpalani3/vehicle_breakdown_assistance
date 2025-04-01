import Login from "./pages/Login"
import { Routes, Route } from 'react-router-dom'
import Signin from "./pages/Signin"
import { useGlobalContext } from "./context/GlobalContextProvider"
import {ToastContainer,toast} from 'react-toastify'
import UserLocationMap from "./components/UserLocationMap"
import MapBox from "./components/MapBox"
import Home from "./pages/Home"
import RequestForm from "./pages/RequestForm.jsx"
import { useEffect, useState } from "react"
import Hamburger from "hamburger-react"
import logo from './assets/logo.jpg'
import MyRequests from "./pages/MyRequests.jsx"
import RecievedRequests from "./pages/RecievedRequests.jsx"
import MyAccount from "./pages/MyAccout.jsx"

function App() {

  const {isMapInput,navigate,getAccessToken,role} = useGlobalContext()
  const [isToggle,setIsToggle] = useState(false)
  const [show,setShow] = useState(true)

  useEffect(()=>{
    getAccessToken()
  },[])

  useEffect(()=>{
    setIsToggle(false)
    if (window.location.pathname=='/login'||window.location.pathname=='/signin') setShow(false)
    else setShow(true)
  },[navigate])

  return (
    <>
    <div className="main-page">
      {
        show&&(
          <header>
          <Hamburger toggled={isToggle} toggle={setIsToggle} Direction='right'/>
          <img src={logo} alt="" className="logo" width='60px'/>
        </header>
        )
      }
      <nav className={`side-nav ${isToggle&&'active'}`}>
        <ul>
          <li onClick={()=>{
            navigate('/')
          }}>Home</li>
          <li onClick={()=>{
            navigate('/my-requests')
          }}>My Requests</li>
          <li onClick={()=>{
            navigate('/request')
          }}>Raise Request</li>
          {
            role==="provider"&&(
            <li onClick={()=>{
              navigate('/received-requests')
            }}>Received Request</li>)
          }
          <li onClick={()=>{
            navigate('/my-account')
          }}>
            My Account
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="login" element={<Login />}/>
        <Route path="signin" element={<Signin />}/>
        <Route path="/" element={<Home />} />
        <Route path="/request" element={<RequestForm />}/>
        <Route path="/my-requests" element={<MyRequests/>}/>
        <Route path="/received-requests" element={<RecievedRequests/>}/>
        <Route path="/my-account" element={<MyAccount/>} />
      </Routes>
    </div>
    {
      isMapInput && <MapBox />
    }
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </>
  )
}

export default App
