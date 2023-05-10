import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

// const SubmitButton = () => {
//     return (
//         <Button variant="primary" className='mb-4'
//                 id="submitButton">Submit</Button>
//     );
// };

const SubmitButton = () => {
  return (
    <Container>
      <div className='d-flex'>
        <div className='mb-3 mx-auto'>
          <Button
            variant='primary' className='mb-4'
            id='submitButton'
          ><p className='description-paragraph'>Submit</p>
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default SubmitButton
