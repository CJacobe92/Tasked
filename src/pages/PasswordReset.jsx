import React, { useState } from 'react'
import { FetchResetPassword } from '../services/ApiFetch'
import { useNavigate } from 'react-router-dom'



const PasswordReset = () => {
  const navigate = useNavigate()
  const [request, setRequest] = useState({email: null})

  const handleSubmit = async () => {
    await FetchResetPassword(request)
    navigate('/login')
  }

  return (
    <div className='min-h-screen w-[100%] flex flex-col justify-center items-center bg-teal-100'>
      <div className='flex flex-col items-center px-4 py-16 bg-white border border-black rounded-md shadow-md justify-evenly w-96 h-80 border-opacity-30'>
        <h1 className='m-2 text-2xl font-bold text-orange-700'>Reset Password</h1>
        <p className='mx-2 my-4 text-center text-md'>If your account exists in our system you should receive a password reset link to update your password.</p>
        <input onChange={(e)=> setRequest({...request, email: e.target.value})} type='text' className='w-full p-2 m-2 text-center border border-black rounded-md outline-none border-opacity-30' placeholder='Please enter your email address'/>
        <button onClick={handleSubmit} className='w-full p-2 mx-2 my-4 font-semibold text-white bg-orange-700'>Submit</button>
      </div>
    </div>
  )
}

export default PasswordReset
