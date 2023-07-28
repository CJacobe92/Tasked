import React, { useState } from 'react'
import { FetchUpdatePassword } from '../services/ApiFetch'
import PasswordUpdateForm from '../components/forms/PasswordUpdateForm'
import { useNavigate } from 'react-router-dom'

const PasswordUpdate = () => {

  const navigate = useNavigate()
  const [request, setRequest] = useState({password: null, password_confirmation: null})

  const getQueryParams = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name)
  }

  const token = getQueryParams('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(request.password !== request.password_confirmation){
      console.log('Password did not match')
      return
    }else{
      await FetchUpdatePassword(token, request)
      navigate('/login')
    }
  }

  return (
    <div className='min-h-screen w-[100%] flex flex-col items-center justify-center bg-teal-100'>
      <PasswordUpdateForm
        setRequest={setRequest}
        request={request}
        handleSubmit={handleSubmit}/>
    </div>
  )
}

export default PasswordUpdate
