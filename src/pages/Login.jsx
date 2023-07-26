import React, { useContext, useState } from 'react'
import LoginForm from '../components/forms/LoginForm'
import { UserContext } from '../reducers/UserContext'
import { fetchLogin } from '../services/ApiFetch'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [request, setRequest] = useState({email: null, password: null})
    const {dispatch} = useContext(UserContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {id, value} = e.target;
        setRequest({...request, [id]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetchLogin({'auth': request})

        dispatch({type: 'SET_UID', payload: response.uid})
        dispatch({type: 'SET_AUTH', payload: response.auth})

        navigate('/')
    }
  return (
    <div className='min-h-screen w-[100%] flex justify-center items-center'>
        <LoginForm
         handleChange={handleChange}
         handleSubmit={handleSubmit}/>
    </div>
  )
}

export default Login
