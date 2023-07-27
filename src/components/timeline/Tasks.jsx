import React, { useContext, useEffect, useRef, useState } from 'react'
import TaskButtons from './TaskButtons'
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from '../../reducers/UserContext';
import { FetchDeleteCategory, FetchDiscardTask, FetchEditCategory, FetchEditTask } from '../../services/ApiFetch';

const Tasks = ({title, category, categoryIndex, handleAddNewTask, newTask, setNewTask}) => {

  const {state, dispatch} = useContext(UserContext)
  const [hide, setHide] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editedTask, setEditedTask] = useState()
  const [editedCategory, setEditedCategory] = useState()

  const handleSubmitEditedTask = async(e) => {
    if(e.key === 'Enter'){
      await FetchEditTask(
        state.uid,
        state.auth,
        editedTask.category_id,
        editedTask.task_id,
        {name: editedTask.name}
      )
      dispatch({type: 'SET_REFETCH'})
    }
  }

  const handleSubmitEditedCategory = async (e) => {
    if(e.key === 'Enter'){
      await FetchEditCategory(state.uid, state.auth, editedCategory.category_id, {name: editedCategory.name})
      dispatch({type: 'SET_REFETCH'})
      setEditMode(false)
    }
  }

  return (
      <div className='my-4 shadow-xl' key={categoryIndex} >
        <div className='flex flex-row items-center justify-between text-white bg-orange-700'>
          {!editMode ? <button className='w-full p-2 text-lg font-semibold text-left' onClick={() => setHide(!hide)}>{category.name}</button> :
          <input
            type='text'
            defaultValue={category.name}
            onChange={(e) => setEditedCategory({...editedCategory, name: e.target.value, category_id: category.id})}
            onKeyDown={handleSubmitEditedCategory}
            className='w-full p-2 text-lg font-semibold text-left bg-orange-700 outline-none'
            />}
            <button onClick={() => setEditMode(!editMode)} className='m-2 text-sm font-semibold'>Edit</button>
            <button className='m-2 text-sm font-semibold' type='button' onClick={ async() => { await FetchDeleteCategory(state.uid, state.auth, category.id); dispatch({type: 'SET_REFETCH'})}}>Delete</button>


        </div>

        {category && category.tasks.filter((task) => {
          if(title === 'Regular'){
            return !task.completed && !task.urgent
          }else if(title === 'Urgent'){
            return !task.completed && task.urgent
          }else if (title === 'Completed'){
            return task.completed
          } else {
            return true
          }
        }).map((task, taskIndex) => (
          <div className={`flex-row items-center justify-between bg-white ${hide ? 'flex' : 'hidden'}`} key={taskIndex} >
              <div className='flex flex-row w-full'>
                <p className='m-2'>{taskIndex + 1}.</p>
                {!editMode ?
                  <p className='m-2'>{task.name}</p> :
                  <input
                    type='text'
                    className='w-full m-2 border-b border-orange-700 outline-none'
                    defaultValue={task.name}
                    onChange={(e) => setEditedTask({...editedTask, name: e.target.value, urgent: task.urgent, completed: task.completed, category_id: task.category_id, task_id: task.id })}
                    onKeyDown={handleSubmitEditedTask}/>
                }
              </div>
              <TaskButtons task={task} title={title}/>
          </div>

        ))

        }
        {title === 'Regular' ?
          <div className={`flex-row text-black bg-white my-1 shadow-md border border-black border-opacity-30 ${!editMode ? 'hidden' : 'flex'}`}>
            <input
              type='text'
              placeholder='Add task'
              className='w-full m-2 border-b border-orange-700 outline-none'
              onChange={(e) => setNewTask({...newTask, name: e.currentTarget.value, urgent: false, completed: false, category_id: category.id})}
              onKeyDown={handleAddNewTask}/>
            <button onClick={handleAddNewTask}>
              <AddIcon style={{fontSize: '2rem'}}/>
            </button>
          </div> : null
        }

      </div>
  )
}

export default Tasks
