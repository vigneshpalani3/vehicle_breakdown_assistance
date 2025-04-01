import React, { useEffect, useState } from 'react'
import '../styles/request.form.css'
import { useGlobalContext } from '../context/GlobalContextProvider'

const RequestForm = () => {
	// issue,vehicleName,vehicleModel,vehicleMake,location
	const [issue,setIssue] = useState('')
	const [vehicleName,setVehicleName] = useState('')
	const [vehicleModel,setVehicleModel] = useState('')
	const [vehicleMake,setVehicleMake]=useState('')
	const {dispatch,actions,addRequest,moveToTop}=useGlobalContext()
	
	useEffect(()=>{
		moveToTop()
		dispatch({type:actions.IS_MAP_INPUT,payload:true})
	},[])

  return (
		<main className="request-page">
			<div className="request-form-container">
				<h1>Request Assistance</h1>
				<form action="" className='request-form' onSubmit={(e)=>addRequest(e,issue,vehicleName,vehicleModel,vehicleMake)}>
					<div className="input-field">
						<label htmlFor="issue">Issue Type</label>
						<input type="text" id='issue' value={issue} onChange={(e)=>setIssue(e.target.value)} required/>
					</div>
					<div className="input-field">
						<label htmlFor="vehicleName">Vehicle Name</label>
						<input type="text" id='vehicleName' value={vehicleName} onChange={(e)=>setVehicleName(e.target.value)} required/>
					</div>
					<div className="input-field">
						<label htmlFor="vehicleModel">Vehicle Model</label>
						<input type="text" id='vehicleModel' value={vehicleModel} onChange={(e)=>setVehicleModel(e.target.value)} required/>
					</div>
					<div className="input-field">
						<label htmlFor="vehicleMake">Vehicle Make</label>
						<input type="text" id='vehicleMake' value={vehicleMake} onChange={(e)=>setVehicleMake(e.target.value)} required/>
					</div>
					<button className='request-sumbit-btn'>Submit</button>
				</form>
			</div>
		</main>
  )
}

export default RequestForm