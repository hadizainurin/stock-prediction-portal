import React from 'react'
import Button from './Button'

const Main = () => {
  return (
    <>
      <div className='container'>
          <div className='p-5 text-center bg-light-dark rounded'>
              <h1 className='text-light'>Stock Prediction Portal</h1>
              <p className='text-light lead'>Stock prediction application utilized machine learning techniques, specifically using Keras and LSTM model, integrated with Django framework.</p>
              <Button text="Explore Now" class="btn-info" url="/dashboard"/>
          </div>
      </div>
    </>
  )
}

export default Main