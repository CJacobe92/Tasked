import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../../reducers/UserContext';
import NewCategory from './NewCategory';
import { FetchCreateTask, FetchDeleteCategory } from '../../services/ApiFetch';
import Tasks from './Tasks';

const TimelineTasks = ({ categories, title }) => {
    const {state, dispatch} = useContext(UserContext)
    const [newTask, setNewTask] = useState({
      name: null,
      category_id: null
    })

    const handleAddNewTask = async (e) => {
      if(e.key === 'Enter' || e.type === 'click'){
        await FetchCreateTask(
          state.uid,
          state.auth,
          newTask.category_id,
          {
            name: newTask.name,
            urgent: false,
            completed: false
          }
        )
        dispatch({type: 'SET_REFETCH'})
        setNewTask({...newTask.name, name: ''})
      }
    }
  return (
    <>
      <NewCategory title={title}/>
      {categories
        && categories.toReversed().map((category, categoryIndex) => {
          if(category.tasks.length === 0 && title === 'Regular'){
            return(
              <div className={`my-4 text-white bg-orange-700 shadow-lg ${title === 'Completed' ? 'hidden' : 'block'}`} key={categoryIndex}>
                <div className='flex flex-row items-center justify-between px-1'>
                  <button className='m-2 text-lg font-semibold'>{category.name}</button>
                  <button className='m-2 text-sm font-semibold' type='button' onClick={ async() => { await FetchDeleteCategory(state.uid, state.auth, category.id); dispatch({type: 'SET_REFETCH'})}}>Delete</button>
                </div>

                <div className='flex flex-row text-black bg-white'>
                  <input
                    type='text'
                    placeholder='New task'
                    className='w-full m-2 border-b border-orange-700 outline-none'
                    onChange={(e) => setNewTask({...newTask, name: e.currentTarget.value, category_id: category.id})}
                    onKeyDown={handleAddNewTask}/>
                  <button className='m-2 text-sm'>Add</button>
                </div>
              </div>
            )
          }else if(category.tasks.length > 0 ){
            return(
              <Tasks
                key={categoryIndex}
                title={title}
                category={category}
                categoryIndex={categoryIndex}
                newTask={newTask}
                setNewTask={setNewTask}
                handleAddNewTask={handleAddNewTask}/>
            )
          }
        })}

    </>
  );
};

export default TimelineTasks;
