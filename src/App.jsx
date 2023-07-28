import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import { UserContextProvider } from './reducers/UserContext'
import Dashboard from './pages/Dashboard'
import Timeline from './components/Timeline'
import PasswordReset from './pages/PasswordReset'
import PasswordUpdate from './pages/PasswordUpdate'

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path={'/login'} element={<Login />}/>
          <Route path={'/register'}element={<Register />}/>
          <Route path={'/api/v1/*'} element={<PasswordUpdate />}/>
          <Route path={'/reset'} element={<PasswordReset />} />
          <Route element={<Dashboard />}>
            <Route path={'/'} element={<Timeline />}/>
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
