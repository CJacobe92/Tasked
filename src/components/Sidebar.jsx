import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../reducers/UserContext'
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
    const navigate = useNavigate()
    const {state, dispatch} = useContext(UserContext)
    const [showSettings, setShowSettings] = useState(false)
    const activeMenuClass = state.active_menu ? 'block' : 'hidden';

    const email = state.email;
    let formattedUsername = '';

    if (email) {
    const username = email.split('@')[0];
    const words = username.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    formattedUsername = words.join(' ');
    }

    let initials = '';
    if (formattedUsername) {
      const names = formattedUsername.split(' ');
      initials = names.map((name) => name.charAt(0)).join('').toUpperCase();
    }

    const handleSettings = () => {
        setShowSettings(!showSettings)
    }
    const handleSignOff = () => {
        localStorage.removeItem('root')
        dispatch({type: 'SET_UID', payload: null})
        dispatch({type: 'SET_AUTH', payload: null})
        dispatch({type: 'SET_ACTIVE_MENU', payload: false})
    }
  return (
    <div className={`bg-gray-900 text-white flex flex-col items-center justify-between ${state.active_menu ? 'w-56' : 'w-12'}`}>
        <div className='h-[10vh] w-full border-b border-white border-opacity-30 flex items-center justify-between '>
            {
                state.active_menu ?
                <>
                    <div className='flex flex-row justify-between w-full px-4'>
                        <h1 className='m-1 text-xl font-bold'>Tasked!</h1>
                        <AssignmentLateTwoToneIcon className='m-1' style={{fontSize: '2rem'}}/>
                    </div>


                </> :
                <>
                    <AssignmentLateTwoToneIcon className='m-1' style={{fontSize: '2rem'}}/>
                </>
            }
        </div>
        <div className='flex flex-col justify-between items-center h-[90vh] w-full'>
            <div className='flex flex-col w-full mt-6'>
                <Link to={'/'} className='flex flex-row items-center hover:bg-orange-700'>
                <HomeIcon className='m-2' style={{fontSize: '2rem'}}/>
                    <p className={`mx-4 my-1 ${activeMenuClass}`}>Timeline</p>
                </Link>
            </div>

            <div className='w-full m-2'>


                <div className='flex flex-row items-center w-full my-4 justify-evenly'>
                    <div className='flex items-center justify-center w-10 h-10 font-semibold border border-white'>{initials}</div>
                    <p className={`text-sm ${activeMenuClass}`}>{formattedUsername}</p>
                    <button onClick={handleSettings} className={`hover:text-orange-700 ${activeMenuClass}` }><SettingsIcon /></button>
                </div>
                <div className={`z-10 bottom-20 bg-gray-800 border border-gray-500 rounded-md m-2 w-44 shadow-lg ${showSettings ? 'fixed': 'hidden'} ${activeMenuClass}`}>
                    <button onClick={handleSignOff} className='flex flex-row items-center justify-center w-full rounded-md hover:bg-orange-700'>
                        <ExitToAppIcon className='m-1' style={{fontSize: '2rem'}}/>
                        <p className={`mx-4 my-1 ${activeMenuClass}`}>Log out</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
