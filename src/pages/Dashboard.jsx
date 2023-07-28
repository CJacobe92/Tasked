import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import usePrivateRoute from '../hooks/usePrivateRoute';
import { FetchUserData } from '../services/ApiFetch';
import { UserContext } from '../reducers/UserContext';

const Dashboard = () => {
  const isAuthenticated = usePrivateRoute();
  const { state, dispatch } = useContext(UserContext);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      if (state.auth) {
        try {
          const data = await FetchUserData(state.uid, state.auth);
          dispatch({ type: 'SET_EMAIL', payload: data.email });
          dispatch({ type: 'SET_CATEGORIES', payload: data.categories });

          const tasksArray = data.categories.map((category) => category.tasks);
          dispatch({ type: 'SET_TASKS', payload: tasksArray });
          dispatch({ type: 'RESET_REFETCH' });
          setFetchFailed(false);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setFetchFailed(true);
        }
      }
    };

    getUserData();
  }, [state.auth, state.refetch, dispatch]);

  return isAuthenticated && !fetchFailed ? (
    <div className='flex flex-row min-h-screen'>
      <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={'/login'} />
  );
};

export default Dashboard;
