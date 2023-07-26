import React, { useContext } from 'react'
import { UserContext } from '../reducers/UserContext'
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({title}) => {

    const {state, dispatch} = useContext(UserContext)

    const email = state.email;
    let formattedUsername = '';

    if (email) {
    const username = email.split('@')[0];
    const words = username.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    formattedUsername = words.join(' ');
    }

    const handleMinimize = () => {
        dispatch({type: 'SET_ACTIVE_MENU'})
    }
  return (
    <div className='bg-orange-700 w-full h-[10vh] flex flex-row justify-between items-center p-4 text-white'>
        <button onClick={handleMinimize}><MenuIcon /></button>
        <p className='m-2 ml-6 text-xl font-semibold'>{title}</p>
    </div>
  )
}

export default Navbar
