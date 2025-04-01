import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/GlobalContextProvider'
import RequestCard from '../components/RequestCard'

const RecievedRequests = () => {
    const {receivedRequests,getReceivedRequests,accessToken} = useGlobalContext()

    useEffect(()=>{
        if(accessToken) getReceivedRequests()
    },[accessToken])

  return (
    <>
    {
      receivedRequests?.length?receivedRequests.map((request)=>{
        return <RequestCard request={request} key={request._id}/>
    }):<div>No Requests</div>
    }
    </>
  )
}

export default RecievedRequests