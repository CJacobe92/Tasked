import { createContext, useEffect, useReducer } from "react";
import { FetchUserData } from "../services/ApiFetch";

const root = JSON.parse(localStorage.getItem('root'))

const initialState = {
    uid: root ? root.uid : null,
    auth: root ? root.auth : null,
    active_menu: root ? root.active_menu : false,
    selected: root ? root.selected : 'Regular',
    email: null,
    categories: [],
    tasks: [],
    refetch: false,
    loading: false,
}

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_UID':
            return {...state, uid: action.payload};
        case 'SET_AUTH':
            return {...state, auth: action.payload};
        case 'SET_EMAIL':
            return {...state, email: action.payload};
        case 'SET_CATEGORIES':
            const categories = action.payload.map((category) => (
                {
                    id: category.id,
                    name: category.name,
                    created_at: category.created_at,
                    updated_at: category.updated_at,
                    tasks: category.tasks
                }
            ))
            return {...state, categories: categories};
        case 'SET_TASKS':
            return {...state, tasks: action.payload};

        // helper states
        case 'SET_SELECTED':
            return {...state, selected: action.payload};
        case 'SET_ACTIVE_MENU':
            return {...state, active_menu: !state.active_menu};
        case 'SET_REFETCH':
            return {...state, refetch: true};
        case 'RESET_REFETCH':
            return {...state, refetch: false};
        case 'SET_LOADING':
            return {...state, loading: action.payload}
        default:
            return state;
    }
}

export const UserContext = createContext(null)

export const UserContextProvider = ({children}) => {

    const [state, dispatch ] = useReducer(reducer, initialState)

    // Store token to localStorage

    useEffect(() => {
        const storeAuth = { uid: state.uid, auth: state.auth, active_menu: state.active_menu, selected: state.selected}
        localStorage.setItem('root', JSON.stringify(storeAuth))

    }, [state.auth, state.uid, state.active_menu, state.selected])

    // Fetch data once on the private route Dashboard

    useEffect(() => {
        const getUserData = async() => {

            if(state.auth){
                const data = await FetchUserData(state.uid, state.auth)
                dispatch({type: 'SET_EMAIL', payload: data.email})
                dispatch({type: 'SET_CATEGORIES', payload: data.categories})

                const tasksArray = data.categories.map((category) => category.tasks)
                dispatch({type: 'SET_TASKS', payload: tasksArray})
                dispatch({type: 'RESET_REFETCH'})
            }
        }

        getUserData()
    }, [state.auth, state.refetch, dispatch])

    return(
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
