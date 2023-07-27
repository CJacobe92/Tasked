  import React, { useContext, useState } from 'react'
  import WrappedHeader from '../services/WrappedHeader'
  import { UserContext } from '../reducers/UserContext'
import TimelineTasks from './timeline/TimelineTasks'

  const Timeline = () => {
      const {state, dispatch} = useContext(UserContext)
      const categories = state.categories

      const handleSelected = (e) => {
        console.log(e.target.value)
        dispatch({type: 'SET_SELECTED', payload: e.target.value})
        dispatch({type: 'SET_REFETCH'})
      }



    return (
      <div className='h-[90vh] px-10 py-10 bg-teal-100 overflow-y-auto'>
          <div className='flex flex-row justify-between my-4'>
              <p className='text-lg font-semibold'>My Tasks</p>
              <select onChange={handleSelected} value={state.selected}>
                  <option value={'Regular'}>Regular</option>
                  <option value={'Urgent'}>Urgent</option>
                  <option value={'Completed'}>Completed</option>
              </select>
          </div>

          <TimelineTasks categories={categories} title={state.selected}/>
      </div>
    )
  }

  export default WrappedHeader(Timeline, 'Timeline')
