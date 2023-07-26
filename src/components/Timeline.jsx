  import React, { useContext, useState } from 'react'
  import WrappedHeader from '../services/WrappedHeader'
  import { UserContext } from '../reducers/UserContext'
import TimelineTasks from './timeline/TimelineTasks'

  const Timeline = () => {
      const {state} = useContext(UserContext)
      const [selected, setSelected] = useState('Regular')
      const categories = state.categories

    return (
      <div className='h-[90vh] px-10 py-10 bg-teal-100 overflow-y-auto'>
          <div className='flex flex-row justify-between my-4'>
              <p className='text-lg font-semibold'>My Tasks</p>
              <select onChange={(e) => setSelected(e.target.value)} defaultValue={'Regular'}>
                  <option value={'Regular'}>Regular</option>
                  <option value={'Urgent'}>Urgent</option>
                  <option value={'Completed'}>Completed</option>
              </select>
          </div>

          <TimelineTasks categories={categories} title={selected}/>
      </div>
    )
  }

  export default WrappedHeader(Timeline, 'Timeline')
