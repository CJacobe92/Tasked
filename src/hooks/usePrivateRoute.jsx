import React, { useContext } from 'react'
import { UserContext } from '../reducers/UserContext';

const usePrivateRoute = () => {
  const { state } = useContext(UserContext);
  return state.auth !== null ? true : false;
}

export default usePrivateRoute
