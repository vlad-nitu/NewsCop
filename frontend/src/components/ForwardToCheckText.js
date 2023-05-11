import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ForwardToCheckText ({ prompt }) {
  return (
    <Container className='my-3 d-flex' id='plagiarismCheckerText'>

      <div className='d-flex flex-column justify-content-center mx-auto'>
      <Link to='/checkText' className='description-paragraph' style={{color: 'black', fontSize: '150%', marginTop: '120px'}}>
          {prompt}
      </Link>
      </div>
    </Container>
  )
}
