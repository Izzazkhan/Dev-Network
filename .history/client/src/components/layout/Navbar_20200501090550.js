import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link href='/profiles'>Developers</Link>
        </li>
        <li>
          <Link href='/register'>Register</Link>
        </li>
        <li>
          <Link href='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
