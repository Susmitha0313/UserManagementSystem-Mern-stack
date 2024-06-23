import React from 'react'
import './navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar-brand'>User Management System</div>
      <ul className='navbar-links'>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  )
}

export default Navbar
