import React from 'react'
import { Link } from 'react-router-dom'
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';


const RegisterForm = ({handleChange, handleSubmit}) => {
  return (
    <form className='w-96 flex flex-col px-6 items-center' onSubmit={handleSubmit}>
      <div className='text-center m-2 w-full text-2xl font-bold pt-2 text-orange-700 flex flex-row justify-center items-center'>
          <p className='m-1'> Tasked!</p>
          <AssignmentLateTwoToneIcon className='m-1'style={{fontSize: '2rem'}}/>
      </div>
      <p className='text-center mx-2 my-1 w-full text-2xl font-bold text-gray-600'>Sign up for an account</p>
      <p className='text-center m-2 w-full text-xs font-semibold'>Already have an account? <Link to={'/'} className='font-bold text-orange-700'>Sign in.</Link></p>
      <div className='flex flex-col m-2 w-full'>
      <label htmlFor="email" className='text-xs font-semibold my-1'>Email</label>
      <input
        type="email"
        name="email"
        id="email"
        className='border border-gray-500 outline-orange-700 p-1 rounded-sm'
        onChange={handleChange}/>
      </div>

      <div className='flex flex-col m-2 w-full'>
      <label htmlFor="password" className='text-xs font-semibold my-1'>Password</label>
      <input
        type="password"
        name="password"
        id="password"
        className='border border-gray-500 p-1 outline-orange-700 rounded-sm'
        onChange={handleChange}/>
      </div>

      <div className='flex flex-col m-2 w-full'>
      <label htmlFor="password_confirmation" className='text-xs font-semibold my-1'>Confirm Password</label>
      <input
        type="password"
        name="password_confirmation"
        id="password_confirmation"
        className='border border-gray-500 p-1 rounded-sm outline-orange-700'
        onChange={handleChange}/>
      </div>

      <div className='mb-4 mt-2 w-full'>
        <button type='submit' className='bg-orange-500 w-full p-2 text-sm font-semibold rounded-sm text-white'>Sign up</button>
      </div>
      <p className='text-xs text-center mb-4 text-gray-600'>By signing up you agree with tasked privacy terms and conditions.</p>
    </form>
  )
}

export default RegisterForm
