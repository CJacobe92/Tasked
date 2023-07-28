import React from 'react'
import { Link } from 'react-router-dom'
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';


const LoginForm = ({handleChange, handleSubmit}) => {
  return (
        <form className='flex flex-col items-center px-6 w-96' onSubmit={handleSubmit}>
            <div className='flex flex-row items-center justify-center w-full pt-2 m-2 text-2xl font-bold text-center text-orange-700'>
                <p className='m-1'> Tasked!</p>
                <AssignmentLateTwoToneIcon className='m-1'style={{fontSize: '2rem'}}/>
            </div>
            <p className='w-full mx-2 my-1 text-2xl font-bold text-center text-gray-600'>Sign in to your account</p>
            <p className='w-full m-2 text-xs font-semibold text-center'>Don't have an account? <Link to={'/register'} className='font-bold text-orange-700'>Sign up.</Link></p>
            <div className='flex flex-col w-full m-2'>
            <label htmlFor="email" className='my-1 text-xs font-semibold'>Email</label>
            <input
                type="email"
                name="email"
                id="email"
                className='p-1 border border-gray-500 rounded-sm outline-orange-700'
                onChange={handleChange}/>
            </div>

            <div className='flex flex-col w-full m-2'>
            <label htmlFor="password" className='my-1 text-xs font-semibold'>Password</label>
            <input
                type="password"
                name="password"
                id="password"
                className='p-1 border border-gray-500 rounded-sm outline-orange-700'
                onChange={handleChange}/>
            </div>
            <div className='w-full my-2'>
                <button className='w-full text-xs font-bold text-left text-orange-700'>Forgot your password? </button>
            </div>
            <div className='w-full mt-2 mb-4'>
                <button type='submit' className='w-full p-2 text-sm font-semibold text-white bg-orange-500 rounded-sm'>Sign in</button>
            </div>
            <div className='w-full'>
                <p className='mb-4 text-xs text-center text-gray-600'>By signing in you agree with tasked privacy terms and conditions.</p>
            </div>

        </form>
    )
}

export default LoginForm
