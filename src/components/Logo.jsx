import React from 'react'
import logo from "../assets/logo.png"

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={logo} alt='logo' className='w-10 rounded'/>
    </div>
  )
}

export default Logo