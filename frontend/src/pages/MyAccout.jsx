import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalContextProvider'
import '../styles/my.account.css'
import { FaPen } from 'react-icons/fa'
import {CiLogout} from "react-icons/ci"
import { toast } from 'react-toastify'

const MyAccount = () => {
    const {role,accessToken,navigate} = useGlobalContext()
    const [myAccount,setMyAccount] = useState({})

    async function getMyAccount(){
        const url='http://localhost:3000/api/'+role
        try {
            const response = await fetch(url,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${accessToken}`
                }
            })
            const result=await response.json()
            if (response.ok) return setMyAccount(result)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleLogout(){
        try {
            const response = await fetch('http://localhost:3000/logout',{
                method:"POST",
                headers:{
                  'Content-Type':"application/json"
                },
                credentials:"include"
            })
            if (!response.ok){
                toast.error('Something went wrong!', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                return
            }
            localStorage.removeItem('access-token')
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    async function removeUser(){
      try {
        const response = await fetch(`http://localhost:3000/api/${role}`,{
          method:"DELETE",
          headers:{
            "Content-Type":"application.json",
            "Authorization":`Bearer ${accessToken}`
          }
        })
        if (response.ok){
          localStorage.removeItem('access-token')
          localStorage.removeItem('role')
          navigate('/login')
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        if (accessToken) getMyAccount()
    },[accessToken])

  return (
    <main className='my-account'>
        <div className="profile-container">
            <div className="logo">{myAccount?.fullname?.slice(0,1)?.toUpperCase()||'?'}</div>
            <div className="fullname">{myAccount.fullname}</div>
            <div className="email">{myAccount.email}</div>
            <button><FaPen/> Edit</button>
            <div className="btns">
                <button className='logout-btn' onClick={()=>handleLogout()}><CiLogout/> Log out</button>
                <button className="del-account" onClick={removeUser}>Delete Account</button>
            </div>
        </div>
    </main>
  )
}

export default MyAccount