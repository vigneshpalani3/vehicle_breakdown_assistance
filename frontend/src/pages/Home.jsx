import React, { useState } from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import logo from '../assets/logo.jpg'
import heroMobile from '../assets/hero-mobile.jpg'
import { FaCar, FaCheckSquare, FaKey } from "react-icons/fa";
import { FaCarBattery } from "react-icons/fa";
import {PiTireFill} from 'react-icons/pi';
import {BsFillFuelPumpFill} from 'react-icons/bs';
import '../styles/home.css'
import { useGlobalContext } from '../context/GlobalContextProvider';

const Home = () => {
    const {navigate} = useGlobalContext()
  return (
    <main className="home">
        <div className="hero">
            <h1>"Fast, Reliable Roadside Assistance – Anytime, Anywhere!"</h1>
            <h2>Stuck on the road? Get help with just a few taps. Whether it’s a flat tire, dead battery, or towing service, we’ve got you covered.</h2>
        </div>
        <div className="how-it-works">
            <h3>How It Works in 3 Simple Steps</h3>
            <ul>
                <li><b>Request Help</b> – Open the app, select your issue, and share your location.</li>
                <li><b>Get Matched</b> – We connect you with the nearest service provider.</li>
                <li><b>Track & Relax</b> – Real-time tracking lets you see help on the way.</li>
            </ul>
        </div>
        <div className="services">
            <h3>Services Available 24/7</h3>
            <h4>List Of Services</h4>
            <ul>
                <li><FaCar /> <b>Towing Service</b> – Quick and safe towing to your preferred location.</li>
                <li><FaCarBattery/> <b>Battery Jumpstart</b> – Get your car back on the road in minutes.</li>
                <li><PiTireFill /> <b>Flat Tire Change</b> – We'll swap out your tire so you can drive safely.</li>
                <li><BsFillFuelPumpFill/> <b>Fuel Delivery</b> – Running low on gas? We’ll bring fuel to you.</li>
                <li><FaKey/> <b>Lockout Assistance</b> – Locked out of your car? We’ll help you get back in.</li>
            </ul>
        </div>
        <button className='action-btn' 
        onClick={()=>navigate('/request')}
        >Request Assistance Now</button>
        <div className="why-choosse-us">
            <ul>
                <li><FaCheckSquare/> Fast Response – Get help within minutes.</li>
                <li><FaCheckSquare/> Reliable Service Providers – Verified professionals ready to assist.</li>
                <li><FaCheckSquare/> Affordable Pricing – No hidden charges.</li>
                <li><FaCheckSquare/> Real-Time Tracking – Know exactly when help will arrive.</li>
            </ul>
        </div>
    </main>
  )
}

export default Home