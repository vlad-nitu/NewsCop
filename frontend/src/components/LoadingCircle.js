import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

/**
 * A loading circle made with the help of a bootstrap spinner,
 * that is going to be used for the duration of making a request to the backend
 * @returns {JSX.Element} the loading circle component
 */
const LoadingCircle = () => {
  return (
    <div className='d-flex justify-content-center align-items-center m-5'>
      <Spinner className='text-info' animation='border' variant='primary' role='status'>
        {/* to make the animation of a growing spinner, add animation ="grow",
           but you also might need to change the color via the className attribute  */}
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  )
}

export default LoadingCircle
