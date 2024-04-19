import React from 'react';
import loadingSpinner from '../images/Iphone-spinner-2.gif';

export default function Spinner() {
  return (
    <div className='text-center'>
      <img src={loadingSpinner}></img>
    </div>
  )
}
