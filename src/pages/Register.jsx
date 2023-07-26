import React, { useContext, useState } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import { fetchRegister } from '../services/ApiFetch'
import { UserContext } from '../reducers/UserContext'

const Register = () => {

  const [request, setRequest] = useState({email: null, password: null, password_confirmation: null})

    const {dispatch} = useContext(UserContext)

    const handleChange = (e) => {
        const {id, value} = e.target;
        setRequest({...request, [id]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetchRegister({'user': request})

        dispatch({type: 'SET_UID', payload: response.uid})
        dispatch({type: 'SET_AUTH', payload: response.auth})

    }
  return (
    <div className='min-h-screen w-[100%] flex justify-center items-center'>
      <RegisterForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}/>
    </div>
  )
}

export default Register
