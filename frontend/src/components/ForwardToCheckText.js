import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ForwardToCheckText ({ prompt }) {
  return (
    <Container className='my-3 d-flex' id='plagiarismCheckerText'>

      <div className='d-flex flex-column justify-content-center mx-auto'>
      <Link to='/checkText' style={{color: 'black'}}>
        <div style={{marginTop: '120px'}}>
          <p className='description-paragraph' style={{ fontSize: '150%'}}>{prompt}</p>
        </div>
      </Link>
      </div>
    </Container>
  )
}
