import React, { useContext, useEffect, useState } from 'react'
import LoginForm from '../components/forms/LoginForm'
import { UserContext } from '../reducers/UserContext'
import { fetchLogin } from '../services/ApiFetch'
import { useNavigate } from 'react-router-dom'
import loadingGif from '../assets/loading.gif'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [request, setRequest] = useState({email: null, password: null})
    const {dispatch, state} = useContext(UserContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {id, value} = e.target;
        setRequest({...request, [id]: value});
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      dispatch({ type: 'SET_LOADING', payload: true });

      // For simulation
      // setTimeout(async () => {
      //   const response = await fetchLogin({ auth: request });
      //   dispatch({ type: 'SET_UID', payload: response?.uid });
      //   dispatch({ type: 'SET_AUTH', payload: response?.auth });

      //   navigate('/');

      //   dispatch({ type: 'SET_LOADING', payload: false });
      // }, 1500); // Set the loading duration (in milliseconds) here

      try {
        const response = await fetchLogin({ auth: request });
        // console.log(response); // Make sure the response has the correct values
        dispatch({ type: 'SET_UID', payload: response?.uid });
        dispatch({ type: 'SET_AUTH', payload: response?.auth });

        dispatch({ type: 'SET_LOADING', payload: false });

        toast.success(`Welcome back!`, {
          position: 'top-right',
          autoClose: 5000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate('/');
      } catch (error) {
        console.error('Error logging in:', error.message);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

  return (
    <div className='min-h-screen w-[100%] flex justify-center items-center'>
      {state.loading ? ( // Show loading message while loading is true
        <div>
          <img
            src={loadingGif}
            alt='Loading...'
            style={{ width: '5rem', height: '5rem' }}
          />
        </div>
      ) : (
        <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
      )}
  </div>
  )
}

export default Login
