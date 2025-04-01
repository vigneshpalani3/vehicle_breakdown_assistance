import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/GlobalContextProvider'
import '../styles/my.requests.css'

const MyRequests = () => {

  const {accessToken,userRequests,getAllRequestsByUser}= useGlobalContext()

  useEffect(()=>{
    if (accessToken) getAllRequestsByUser()
  },[accessToken])

  return (
    <main className="my-requests-page">
      <h1>My Requests</h1>
      <div className="requests-container">
        {
          userRequests.length ? (
            userRequests.map((request)=>{
              const date = request.createdAt.split('T')
              return (
              <div key={request._id} className='my-request__request'>
                <h3><b>Issue Type :</b> {request.issueType}</h3>
                <div className="make"><b>Vehicle Make :</b> {request.vehicleMake || 'unknown'}</div>
                <div className="name"><b>Vehicle Name :</b> {request.vehiclName  || 'unknown' }</div>
                <div className="model"><b>Vahicle Model :</b> {request.vehicleModel || 'unknown'}</div>
                <div className="created-date"><b>Requested Date :</b> {date[0]}</div>
                <div className="created-time"><b>Requested Time :</b> {date[1].slice(0,8)}</div>
                <div className={`status ${request.status}`}>{request.status}</div>
              </div>
            )})
          ):(
            <div>No Request Found</div>
          )
        }
      </div>
    </main>
  )
}

export default MyRequests