import React, { useEffect, useState } from 'react'
import '../styles/Login.css'
import { useGlobalContext } from '../context/GlobalContextProvider'

const Login = () => {
    const [isChecked,setIsChecked]=useState(false)
    const {navigate,handleUserLogin,handleProviderLogin} = useGlobalContext()
    const [pass,setPass]=useState('')
    const [email,setEmail]=useState('')
    const [role,setRole]=useState('consumer')

    function handleLogin(e){
        console.log('hello')
        e.preventDefault()
        if(role=="consumer") return  handleUserLogin(email,pass)
        handleProviderLogin(email,pass)
    }

  return (
    <main className="login-page">
        <div className="login-box">
            <h1>LOGIN</h1>
            <form action="" onSubmit={(e)=>handleLogin(e)}>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' placeholder='example@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div className="inputfield">
                    <label htmlFor="password">Password</label>
                    <input type={`${isChecked?'text':'password'}`} id='password' name='password' placeholder='Enter Password' value={pass} onChange={(e)=>setPass(e.target.value)} required/>
                </div>
                <div className="check">
                    <input type="checkbox" id='show' checked={isChecked} onChange={(e)=>setIsChecked(e.target.checked)}/>
                    <label htmlFor="show">Show Password</label>
                </div>
                <div className="inputfield">
                    <select name="role" id="roles" value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value="service-provider">Service Provider</option>
                        <option value="consumer">Consumer</option>
                    </select>
                </div>
                <a href="#" className="forgot-pass">
                    Forgot Passward?
                </a>
                <div className="btns">
                    <button onClick={(e)=>{
                        e.preventDefault()
                        navigate('/signin')
                    }} >Sign in</button>
                    <button className='active'>Login</button>
                </div>
            </form>
        </div>
    </main>
  )
}

export default Login