import React, { useContext } from 'react'
import { UserContext } from '../../reducers/UserContext'
import { FetchDiscardTask, FetchEditTask } from '../../services/ApiFetch'

const TaskButtons = ({task, title}) => {

    const {state, dispatch} = useContext(UserContext)

    const handleUrgent = async (task) => {
        await FetchEditTask(state.uid, state.auth, task.category_id, task.id,  {urgent: !task.urgent})
        dispatch({type: 'SET_REFETCH'})
      }

      const handleCompleted = async (task) => {
        await FetchEditTask(state.uid, state.auth, task.category_id, task.id,  {completed: !task.completed})
        dispatch({type: 'SET_REFETCH'})
      }

      const handleDiscard = async(task) => {
        await FetchDiscardTask(state.uid, state.auth, task.category_id, task.id)
        dispatch({type: 'SET_REFETCH'})
      }

  return (
    <>
        {
          !task.completed ?
            <div className='flex flex-row text-sm'>
                <button onClick={() => handleUrgent(task)} className='m-2'>
                {title === 'Urgent' ? 'Regular' : 'Urgent' }
                </button>
                <button onClick={() => handleCompleted(task)} className='m-2'>Completed</button>
                <button onClick={() => handleDiscard(task)}  className='m-2'>Discard</button>
            </div> :

            <div className='flex flex-row text-sm'>
                <button onClick={() => handleCompleted(task)} className='m-2'>Incomplete</button>
                <button onClick={() => handleDiscard(task)}  className='m-2'>Discard</button>
            </div>

        }
    </>
  )
}

export default TaskButtons
