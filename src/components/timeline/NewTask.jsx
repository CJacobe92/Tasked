import React, { useContext, useState, useRef } from 'react';
import { FetchCreateTask } from '../../services/ApiFetch';
import { UserContext } from '../../reducers/UserContext';

const NewTask = ({ category, disabled, index, setDisabled, selected }) => {
  const [newTask, setNewTask] = useState({ name: '', urgent: false, completed: false, category_id: null });
  const { state, dispatch } = useContext(UserContext);
  const inputRef = useRef(null);

  const handleAdd = async (e) => {
    if (e.key === 'Enter') {
      await FetchCreateTask(state.uid, state.auth, newTask.category_id, { name: newTask.name, completed: false, urgent: false });
      dispatch({ type: 'SET_REFETCH' });
      setNewTask({ ...newTask, name: '' });
    }
  };

  return (
    <div className={`flex-row bg-white text-black px-4 ${selected !== category.id ? 'flex' : 'hidden'}`} key={index}>
      <div className={`flex-row w-full ${selected !== category.id && disabled ? 'hidden' : 'flex'}`}>
        <p className='p-2 my-2 font-bold'>{category.tasks.length + 1}. </p>
        <input
          ref={inputRef}
          onKeyDown={handleAdd}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value, category_id: category.id })}
          value={newTask.name}
          className={`m-2 w-full outline-none p-2 border-b border-orange-700`}
          placeholder='Add task'
          disabled={disabled}
        />
        <div className='flex flex-row text-sm'>
          <button onClick={() => handleUrgent(category.id)} className='m-2'>Urgent</button>
          <button onClick={() => handleCompleted(category.id)} className='m-2'>Completed</button>
          <button onClick={() => setDisabled(true)} className='m-2'>Discard</button>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
