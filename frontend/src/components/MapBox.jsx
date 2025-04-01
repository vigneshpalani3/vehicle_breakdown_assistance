import React from 'react'
import UseLocationMap from './UserLocationMap'
import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContextProvider';

const MapBox = () => {
  const {location,actions,dispatch}= useGlobalContext()

  return (
    <div className="map-container">
        <UseLocationMap width='100%' height='95%' location={location} setLocation={(loc)=>dispatch({type:actions.SET_LOCATION,payload:loc})}/>
        <button className='location-submit-btn' onClick={()=>{dispatch({type:actions.IS_MAP_INPUT,payload:false})}}>Submit</button>
    </div>
  )
}

export default MapBox