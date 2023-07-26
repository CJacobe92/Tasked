import React from 'react'
import { Link } from 'react-router-dom'
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';


const LoginForm = ({handleChange, handleSubmit}) => {
  return (
        <form className='w-96 flex flex-col px-6 items-center' onSubmit={handleSubmit}>
            <div className='text-center m-2 w-full text-2xl font-bold pt-2 text-orange-700 flex flex-row justify-center items-center'>
                <p className='m-1'> Tasked!</p>
                <AssignmentLateTwoToneIcon className='m-1'style={{fontSize: '2rem'}}/>
            </div>
            <p className='text-center mx-2 my-1 w-full text-2xl font-bold text-gray-600'>Sign in to your account</p>
            <p className='text-center m-2 w-full text-xs font-semibold'>Don't have an account? <Link to={'/register'} className='font-bold text-orange-700'>Sign up.</Link></p>
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
            <div className='w-full my-2'>
                <button className='text-left w-full text-xs text-orange-700 font-bold'>Forgot your password? </button>
            </div>
            <div className='mb-4 mt-2 w-full'>
                <button type='submit' className='bg-orange-500 w-full p-2 text-sm font-semibold rounded-sm text-white'>Sign in</button>
            </div>
            <div className='w-full'>
                <p className='text-xs mb-4 text-gray-600 text-center'>By signing in you agree with tasked privacy terms and conditions.</p>
            </div>

        </form>
    )
}

export default LoginForm
