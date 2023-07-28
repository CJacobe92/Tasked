import React from 'react'
import Sidebar from '../components/Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import usePrivateRoute from '../hooks/usePrivateRoute'

const Dashboard = () => {
    const isAuthenticated = usePrivateRoute();

  return isAuthenticated ? (
    <div className='flex flex-row min-h-screen'>
        <Sidebar />
        <Outlet />
    </div>
  ) : (
    <Navigate to={'/login'} />
  )
}

export default Dashboard
