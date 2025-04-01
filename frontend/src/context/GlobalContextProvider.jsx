import React, { createContext, useContext, useEffect, useReducer } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

// create global context
const GlobalContext=createContext()

//actions
const actions = {
  ACCESS_TOKEN:"ACCESS_TOKEN",
  ERROR:"ERROR",
  WARNING:"WARNING",
  SET_LOCATION:"SET_LOCATION",
  IS_MAP_INPUT:"IS_MAP_INPUT",
  ROLE:"ROLE",
  REQUESTS:"REQUESTS",
  RECEIVED_REQUESTS:"RECEIVED_REQUESTS"
}

//global context provider component
const GlobalContextProvider = ({children}) => {

  //reducer funtion
  function reducer(state,{type,payload}){
    switch (type){
      case actions.ERROR:
        return  {...state,isError:true,errorMessage:payload}
      case actions.WARNING:
        return {...state,warningMessage:payload}
      case actions.SET_LOCATION:
        return {...state,location:payload}
      case actions.IS_MAP_INPUT:
        console.log(payload)
        return {...state,isMapInput:payload}
      case actions.ROLE:
        return {...state,role:payload}
      case actions.ACCESS_TOKEN:
        if (!payload) return navigate('/login')
        return {...state,accessToken:payload}
      case actions.REQUESTS:
        return {...state,userRequests:payload}
      case actions.RECEIVED_REQUESTS:
        return {...state,receivedRequests:payload}
      default:
        return "reducer works properly"
    }
  }
  
  //states and ruducer
  const navigate = useNavigate()
  const [state,dispatch] = useReducer(reducer,{
    userRequests:[],
    receivedRequests:[],
    location:{ lat: 11.1271, lng: 78.6569 },
    accessToken:null,
    role:null,
    isError:false,
    errorMessage:'',
    warningMessage:'',
    isMapInput:false
  })
  const baseUrl='http://localhost:3000'
    
  // function to get accesstoken from localstorage
  async function getAccessToken(){
    const loadedToken = await JSON.parse(localStorage.getItem('access-token')) || null
    const loadedRole = localStorage.getItem('role')
    if (!loadedToken) return navigate('/login')
      dispatch({type:actions.ACCESS_TOKEN,payload:loadedToken})
      dispatch({type:actions.ROLE,payload:loadedRole})
  }
  
  // function to register the user
  async function handleUserRegister(e,username,email,pass,confirmPass,role){
    try{
      e.preventDefault()
      if(pass!==confirmPass) return dispatch({type:actions.WARNING,payload:'Passwords don\'t match with eachother'})
        if (role =="consumer"){
          // creating a request for user registeration 
          const response = await fetch(`${baseUrl}/api/user/register`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            fullname:username,
            email,
            password:pass
          })
        })
        const result = await response.json()
        if(response.ok){
          navigate('/login')
          toast.success('👤 user registered successfully', {
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
          toast(result.Message, {
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
      const response = await fetch(`${baseUrl}/api/provider/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          fullname:username,
          email,
          password:pass,
          location:[state.location.lng,state.location.lat]
        })
      })
      const result = await response.json()
      if(response.ok){
        navigate('/login')
        toast.success('👤 user registered successfully', {
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
        toast.error(result.Message,{
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }catch(err){
        dispatch({type:actions.ERROR,payload:err.message})
        console.log(err.message)
      }
    }
    
    // function to add request
    async function addRequest(e,issue,vehicleName,vehicleModel,vehicleMake){
      try{
        if (!issue || !vehicleName || !vehicleModel || !vehicleMake) return
        e.preventDefault()
        console.log(issue,vehicleName,vehicleModel,vehicleMake)
        const response=await fetch(`${baseUrl}/api/request`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`bearer ${state.accessToken}`
        },
        body:JSON.stringify({
          issue:issue.trim(),
          vehicleName:vehicleName.trim(),
          vehicleModel:vehicleModel.trim(),
          vehicleMake:vehicleMake.trim(),
          location:[state.location.lng,state.location.lat]
        })
      })
      const result=await response.json()
      if(response.ok){
        console.log(result)
        toast.success('Request Raised Successfully', {
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
      toast.error(result.message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }catch(err){
      dispatch({type:actions.ERROR,payload:err.message})
      console.log(err.message)
    }
  }
  
  //handling user login
  async function handleUserLogin(email,pass){
    try{
      const response = await fetch(`${baseUrl}/api/user/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
          email,
          password:pass
        })
      })
      const result = await response.json()
      if (response.ok){
        localStorage.setItem('access-token',JSON.stringify(result.accessToken))
        localStorage.setItem("role","user")
        dispatch({type:actions.ACCESS_TOKEN,payload:result.accessToken})
        dispatch({type:actions.ROLE,payload:"user"})
        navigate('/')
        toast.success('👤 user logged in successfully', {
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
      toast.error(result.message,{
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      console.log(result.Message)
    }catch(err){
      dispatch({type:actions.ERROR,payload:err.message})
      console.log(err.message)
    }
  }
  
  //handling provider login
  async function handleProviderLogin(email,pass){
    try{
      const response= await fetch(`${baseUrl}/api/provider/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
          email,
          password:pass
        })
      })
      const result = await response.json()
      if (response.ok){
        localStorage.setItem('access-token',JSON.stringify(result.accessToken))
        localStorage.setItem('role',"provider")
        dispatch({type:actions.ROLE,payload:"provider"})
        dispatch({type:actions.ACCESS_TOKEN,payload:result.accessToken})
        navigate('/')
        toast.success('👤 user logged in successfully', {
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
      toast.error(result.message,{
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }catch(err){
      console.log(err.message)
      dispatch({type:actions.ERROR,payload:err.message})
    }
  }
  
  //refresh token function
  async function refreshToken(){
    try{
      if(window.location.pathname !=='/') return
      const response= await fetch(`${baseUrl}/refresh`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:"include"
      })
      const result= await response.json()
      if(response.ok){
        localStorage.setItem('access-token',JSON.stringify(result.accessToken))
        dispatch({type:actions.ACCESS_TOKEN,payload:result.accessToken})
        console.log(result.accessToken)
        navigate('/')
        return
      }
      navigate('/login')
      console.log(result.message)
    }catch(err){
      dispatch({type:actions.ERROR,payload:err.message})
      console.log(err)
    }
  }
  
  // get all request by the user
  async function getAllRequestsByUser(){
    try{
      const response=await fetch(`${baseUrl}/api/request`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${state.accessToken}`
        }
      })
      const result=await response.json()
      if (response.ok) return dispatch({type:actions.REQUESTS,payload:result})
      toast.error(result.message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(result)
    }catch(err){
      dispatch({type:actions.ERROR,payload:err.message})
      console.log(err.message)
    }
  }

  // get the requests that are recieved by the provider
  async function getReceivedRequests(){
    try{
      const response= await fetch(`${baseUrl}/api/provider/reqs`,{
        method:"GET",
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${state.accessToken}`
        }
      })
      const result = await response.json()
      const requests=result.requests
      requests.sort((a, b) => new Date(b.date) - new Date(a.date));
      if(response.ok) return dispatch({type:actions.RECEIVED_REQUESTS,payload:requests})
      console.log(result)
    }catch(err){
      dispatch({type:actions.ERROR,payload:err.message})
      console.log(err.message)
    }
  }
  
  //move to top
  function moveToTop(){
    window.scrollTo({top:0,behavior:'smooth'})
  }
  
  //close map
  function closeMap(){
    dispatch({type:actions.IS_MAP_INPUT,payload:false})
  }

  useEffect(()=>{
    console.log(state.receivedRequests)
  },[state.receivedRequests])

  // run getAccessToken for first render
  useEffect(()=>{
    refreshToken()
  },[])
  
  useEffect(()=>{
    closeMap()
  },[navigate])

  return (
   <GlobalContext.Provider value={{
     ...state,
    navigate,
    actions,
    dispatch,
    getAccessToken,
    handleUserRegister,
    handleProviderLogin,
    handleUserLogin,
    addRequest,
    moveToTop,
    getAllRequestsByUser,
    getReceivedRequests
   }}>{children}</GlobalContext.Provider>
  )
}

// useGlobalContext hook
export function useGlobalContext(){
  return useContext(GlobalContext)
}

export default GlobalContextProvider