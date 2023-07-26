import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const WrappedHeader = (Component, title) => {

  const NewComponent = () => (

    <>
    <div className='flex flex-col w-full'>
      <Navbar title={title}/>
      <Component />
     </div>
    </>
  );

  return NewComponent;
};

export default WrappedHeader;
