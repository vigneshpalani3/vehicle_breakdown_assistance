import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalContextProvider'

const Signin = () => {
  const [isChecked,setIsChecked] = useState(false)
  const {navigate,handleUserRegister,actions,dispatch} = useGlobalContext()
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [pass,setPass] = useState('')
  const [confirmPass,setConfirmPass] = useState('')
  const [role,setRole] = useState('consumer')

  return (
    <main className="signin-page">
        <div className="signin-box">
            <h1>SIGN IN</h1>
            <form onSubmit={(e)=>handleUserRegister(e,username,email,pass,confirmPass,role)}>
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' name='username' placeholder='Jhon Doe' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' placeholder='example@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div className="inputfield">
                    <label htmlFor="password">Password</label>
                    <input type={`${isChecked?'text':'password'}`} id='password' name='password' placeholder='Enter Password' value={pass} onChange={(e)=>setPass(e.target.value)} required/>
                </div>
                <div className="inputfield">
                    <label htmlFor="con-password">Confirm Password</label>
                    <input type={`${isChecked?'text':'password'}`} id='con-password' name='con-password' placeholder='Enter Confirm Password' value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} required/>
                </div>
                <div className="check">
                    <input type="checkbox" id='show' checked={isChecked} onChange={(e)=>setIsChecked(e.target.checked)} />
                    <label htmlFor="show">Show Password</label>
                </div>
                <div className="inputfield">
                    <label htmlFor="roles">Role</label>
                    <select name="role" id="roles" value={role} onChange={(e)=>{
                        console.log(e.target.value)
                        if (e.target.value=="service-provider") dispatch({type:actions.IS_MAP_INPUT,payload:true})
                        setRole(e.target.value)
                        }} required>
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
                      navigate('/login')
                    }}>Login</button>
                    <button  className='active'>Sign in</button>
                </div>
            </form>
        </div>
    </main>
  )
}

export default Signin