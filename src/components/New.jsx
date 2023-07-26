import React from 'react'
import WrappedHeader from '../services/WrappedHeader'

const New = () => {
  return (
    <div className='h-[90vh] px-10 py-10 bg-teal-100'>
          <div className='flex flex-row justify-between w-full m-2 my-4'>
              <p className='px-2 text-lg font-semibold'>New Task</p>
          </div>

      </div>
  )
}

export default WrappedHeader(New, 'New')
