import React, { useContext, useState } from 'react'
import { FetchCreateCategory } from '../../services/ApiFetch'
import { UserContext } from '../../reducers/UserContext'

const NewCategory = ({title}) => {

const {state, dispatch} = useContext(UserContext)
const [categoryName, setCategoryName] = useState()

const handleNewCategory = async(e) => {
    if(e.key === 'Enter'){
    await FetchCreateCategory(state.uid, state.auth, categoryName)
    dispatch({type: 'SET_REFETCH'})
    }
}

  return (
    <>
      <input onKeyDown={handleNewCategory} onChange={(e) => setCategoryName({name: e.target.value})} type='text' className={`w-full p-2 border-2 border-orange-700 shadow-md outline-none mb-4`} placeholder='New category'/>
      <div className='flex flex-row items-center justify-between w-full p-2 text-xl font-semibold text-left bg-white border border-black shadow-xl border-opacity-30 rounded-t-md'>
          <p>{title} Tasks</p>
      </div>
    </>
  )
}

export default NewCategory
