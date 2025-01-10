import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gray-400 '>
      <Outlet />
    </div>
  )
}

export default AuthLayout