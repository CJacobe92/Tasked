import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../reducers/UserContext';
import { FetchCreateCategory, FetchDeleteCategory, FetchDiscardTasks, FetchEditTasks } from '../../services/ApiFetch';
import NewTask from './NewTask';

const TimelineTasks = ({ categories, title }) => {
    const {state, dispatch} = useContext(UserContext)
    const [taskName, setTaskName] = useState({name: null, category_id: null, task_id: null})
    const [categoryName, setCategoryName] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [hideNew, setHideNew] = useState(false)
    const [selected, setSelected] = useState(null)


    const handleUrgent = async (category, task, urgent) => {
      await FetchEditTasks(state.uid, state.auth, category, task,  {urgent: !urgent})
      dispatch({type: 'SET_REFETCH'})
    }

    const handleEdit = () => {
      setDisabled(!disabled)
    }

    const handleEditTaskName = async (e) => {
      if(e.key === 'Enter'){
        await FetchEditTasks(state.uid, state.auth, taskName.category_id, taskName.task_id,  {name: taskName.name})
        dispatch({type: 'SET_REFETCH'})
        setDisabled(true)
      }
    }

    const handleCompleted = async (category, task, completed) => {
      await FetchEditTasks(state.uid, state.auth, category, task,  {completed: !completed})
      dispatch({type: 'SET_REFETCH'})
    }

    const handleDiscard = async(category, task) => {
      await FetchDiscardTasks(state.uid, state.auth, category, task)
      dispatch({type: 'SET_REFETCH'})
    }

    const handleDelete = async(category) => {
      await FetchDeleteCategory(state.uid, state.auth, category)
      dispatch({type: 'SET_REFETCH'})
    }

    const handleNewCategory = async(e) => {
      if(e.key === 'Enter'){
        await FetchCreateCategory(state.uid, state.auth, categoryName)
        dispatch({type: 'SET_REFETCH'})
        setHideNew(!hideNew)
      }
    }

  return (
    <div>
      <div className='w-full my-2'>
        <input onKeyDown={handleNewCategory} onChange={(e) => setCategoryName({name: e.target.value})} type='text' className={`w-full p-2 border-2 border-orange-700 shadow-md outline-none mb-4`} placeholder='New category'/>
      </div>
      <div className='flex flex-row items-center justify-between w-full p-2 text-sm font-semibold text-left bg-white border border-black shadow-xl border-opacity-30 rounded-t-md'>
        {title} Tasks
        <div>
          <button onClick={handleEdit} className='m-1 text-sm'>
            {disabled ? 'Edit' : 'Save'}
          </button>
        </div>
      </div>

      {categories && categories.map((category, index) => (
        <div className='flex-col my-4 border border-black shadow-xl border-opacity-30' key={index}>
          <div className= 'flex flex-row items-center justify-between w-full px-4 py-2 text-2xl font-semibold text-left text-white bg-orange-700 border border-black border-opacity-30' >
              <button onClick={() => setSelected((prevId) => (prevId  === category.id ? null : category.id))} className='w-full text-left'>
                {category.name}
              </button>
              <button onClick={() => handleDelete(category.id)} className='m-2 text-sm'>
                  Delete
              </button>
          </div>


          {category && category.tasks.filter((task) =>  {
             if(title === 'Regular'){
              return task.completed === false && task.urgent === false
            }else if (title === 'Urgent'){
              return task.completed === false && task.urgent === true
            }else if (title === 'Completed'){
              return task.completed === true
            }
          }
         ).map((task, index) => (
            <div className={`flex-row bg-white text-black px-4 ${selected !== category.id ? 'flex' : 'hidden'}`} key={index}>
              <p className='p-2 my-2 font-bold'>{index + 1}. </p>
              <input onKeyDown={handleEditTaskName} onChange={(e) => setTaskName({...taskName, name: e.target.value, category_id: category.id, task_id: task.id})} className={`m-2 w-full outline-none p-2 ${disabled ? '' : 'border-b border-orange-700'}`} defaultValue={task.name} disabled={disabled}/>
              <div className='flex flex-row text-sm'>
                <button onClick={() => handleUrgent(category.id, task.id, task.urgent)} className='m-2'>
                {title !== 'Urgent' ? 'Urgent' : 'Regular' }
                </button>
                <button onClick={() => handleCompleted(category.id, task.id, task.completed)} className='m-2'>
                  {title !== 'Completed' ? 'Completed' : 'Incomplete' }
                </button>
                <button onClick={() => handleDiscard(category.id, task.id)}className='m-2'>Discard</button>
              </div>
            </div>
          ))}
            <NewTask
              category={category}
              index={index}
              disabled={disabled}
              setDisabled={setDisabled}
              selected={selected}/>
          </div>
          ))}
    </div>
  );
};

export default TimelineTasks;
