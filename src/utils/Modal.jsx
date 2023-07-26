import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

const Modal = ({btnTitle, modalTitle, children}) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }


    const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        zIndex: 1000
    }

    const OVERLAY_STYLES = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000
    }

  return (
    <>
        <button  onClick={openModal}>{btnTitle}</button>
        {
            isOpen && (
        <div>
            <div style={OVERLAY_STYLES}/>
            <div style={MODAL_STYLES} className='flex flex-col p-0 m-0'>
                <div className='flex flex-row items-center justify-between p-4 bg-orange-700'>
                    <p className='text-sm'>{modalTitle}</p>
                    <button onClick={closeModal} className='text-sm'><CancelIcon /></button>
                </div>
                {children}
            </div>
        </div>
            )
        }

    </>

  )
}

export default Modal
