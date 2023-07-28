import React from 'react'

const PasswordUpdateForm = ({setRequest, request, handleSubmit}) => {
  return (
      <form className='flex flex-col items-center justify-center p-4 bg-white border border-black rounded-md shadow-lg border-opacity-30 h-80 w-96' onSubmit={handleSubmit}>
        <h1 className='m-6 text-2xl font-bold text-orange-700'>Change Password</h1>
        <label className='w-full m-2 text-sm text-left'>New Password</label>
        <input onChange={(e)=> setRequest({...request, password: e.target.value})} type='password' name='password' className='w-full p-1 m-2 border border-black'/>
        <label className='w-full m-2 text-sm text-left'>Confirm Password</label>
        <input onChange={(e)=> setRequest({...request, password_confirmation: e.target.value})} type='password' name='password_confirmation' className='w-full p-1 m-2 border border-black'/>
        <button type='submit' className='w-full p-2 m-2 font-semibold text-white bg-orange-700 rounded-sm'>Update</button>
      </form>
  )
}

export default PasswordUpdateForm
