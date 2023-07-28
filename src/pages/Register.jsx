import React, { useContext, useState } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import { fetchRegister } from '../services/ApiFetch'
import { UserContext } from '../reducers/UserContext'
import { useNavigate } from 'react-router-dom'
import loadingGif from '../assets/loading.gif'

const Register = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState({email: null, password: null, password_confirmation: null})

    const {dispatch, state} = useContext(UserContext)

    const handleChange = (e) => {
        const {id, value} = e.target;
        setRequest({...request, [id]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: 'SET_LOADING', payload: true });

        // For simulation

        // setTimeout(async() => {
        //   const response = await fetchRegister({'user': request})

        //   dispatch({type: 'SET_UID', payload: response.uid})
        //   dispatch({type: 'SET_AUTH', payload: response.auth})
        //   navigate('/')
        //   dispatch({ type: 'SET_LOADING', payload: false });
        // }, 1500)

        try{
          const response = await fetchRegister({'user': request})

          dispatch({type: 'SET_UID', payload: response.uid})
          dispatch({type: 'SET_AUTH', payload: response.auth})
          navigate('/')
          dispatch({ type: 'SET_LOADING', payload: false });
        }catch(error) {
          console.error('Error logging in:', error.message);
          dispatch({ type: 'SET_LOADING', payload: false });
        }

    }
  return (
    <div className='min-h-screen w-[100%] flex justify-center items-center'>
      {state.loading ?
        <div>
          <img
            src={loadingGif}
            alt='Loading...'
            style={{ width: '5rem', height: '5rem' }}
          />
        </div> :
        <RegisterForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}/>
      }
    </div>
  )
}

export default Register
