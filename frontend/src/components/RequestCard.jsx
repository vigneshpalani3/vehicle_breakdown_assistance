import { useEffect, useState } from "react";
import "../styles/RequestCard.css"; // Import the CSS file
import { useGlobalContext } from "../context/GlobalContextProvider";
import { toast } from "react-toastify";

export default function RequestCard({ request }) {

  const {accessToken} = useGlobalContext()
  const [status,setStatus] = useState(request.status)
  const [isShow,setIsShow] = useState(false)

  const url='http://localhost:3000/api/request'

  async function handleState(reqId,state){
    try{
      console.log('works')
      const response = await fetch(`${url}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${accessToken}`
        },
        body:JSON.stringify({
          reqId,
          state
        })
      })
      const result = await response.json()
      setIsShow(false)
      if (response.ok){
        toast.success('status updated successfully', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setStatus(state)
        return
      }
      console.log(result)
    }catch(err){
      console.log(err)
    }
  }

  function openMap(){
    try{
      const googleMapUrl=`https://www.google.com/maps?q=${request.location.coordinates[1]},${request.location.coordinates[0]}`
      window.open(googleMapUrl,'_blank')
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="request-card">
      <div className="request-card-content">
        <h2 className="request-title">
          {request.vehicleName} ({request.vehicleModel} - {request.vehicleMake})
        </h2>
        <p className="request-info">
          <strong>Issue Type:</strong> {request.issueType}
        </p>
        <p className="request-info">
          <strong>Status : </strong> 
          <span>
             {status}
          </span>
        </p>
        <div className="button-group">
          <button className="status-button" onClick={()=>setIsShow(isShow=>!isShow)}>
            ✅ Change Status
          </button>
          <button className="map-button" onClick={()=>openMap()}>
            📍 Show Map
          </button>
        </div>
      </div>
      <ul className={`${isShow?'active':''} status-card`}>
        <li className={`${status.toLowerCase()=='accepted'?'active':''}`} onClick={()=>handleState(request._id,'accepted')}>Accepted</li>
        <li className={`${status.toLowerCase()=='rejected'?'active':''}`} onClick={()=>handleState(request._id,'rejected')}>Rejected</li>
        <li className={`${status.toLowerCase()=='assisted'?'active':''}`} onClick={()=>handleState(request._id,'assisted')}>Assisted</li>
      </ul>
    </div>
  );
}
