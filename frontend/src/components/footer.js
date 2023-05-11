import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'

/**
 * Footer component displays the footer of the web page with social links, company information and contact information.
 *
 * @returns {JSX.Element} Footer component JSX element.
 *
 */
export default function Footer () {
  // Inline style object for footer section.
  const footerStyle = {
    backgroundColor: '#D4DCDB',
    color: '#485A58'
  }

  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div id='footer'>
      <footer style={footerStyle} className='text-center text-lg-start footerStyle'>
        {/* Social Section */}
        <section className='d-flex justify-content-between p-4 text-white' style={{ backgroundColor: '#2E837E' }}>
          <div className='me-5'>
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href='#!' class='text-white me-4'>
              <i class='fab fa-facebook-f' />
            </a>
            <a href='#!' class='text-white me-4'>
              <i class='fab fa-twitter' />
            </a>
            <a href='#!' class='text-white me-4'>
              <i class='fab fa-google' />
            </a>
            <a href='#!' class='text-white me-4'>
              <i class='fab fa-instagram' />
            </a>
            <a href='#!' class='text-white me-4'>
              <i class='fab fa-linkedin' />
            </a>
          </div>
        </section>
        {/* Main Footer Section */}
        <section style={{ color: '#485A58 !important' }}>
          <Container className='text-center text-md-start mt-5'>
            <Row className='mt-3'>
              <Col md={3} lg={4} xl={3} className='mx-auto mb-3'>
                <h6 className='text-uppercase fw-bold'>NewsCop</h6>
                <hr
                  className='mb-2 mt-0 d-inline-block mx-auto'
                  style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                />
                <p>
                  Creating a platform that provides various ways of
                  comparing news articles, helping users to identify
                  overlapping content quickly and accurately and,
                  consequently, decreasing the impact of missinformation
                  and plagiarism in the media.
                </p>
              </Col>
              <Col md={2} lg={2} xl={2} className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold'>Services</h6>
                <hr
                  className='mb-2 mt-0 d-inline-block mx-auto'
                  style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                />
                <p>
                  <Link to='/checkURL'>
                    <a href='#!' onClick={handleClick}>URL plagiarism checker</a>
                  </Link>
                </p>
                <p>
                  <Link to='/checkText'>

                    <a href='#!' onClick={handleClick}>Text plagiarism checker</a>
                  </Link>

                </p>

                <p>
                  <a href='#!'>Text similarity checker</a>
                </p>
                <p>
                  <a href='#!' onClick={handleClick}>URL similarity checker</a>
                </p>
              </Col>
              {/* <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Company</h6>
                                <hr
                                    className="mb-2 mt-0 d-inline-block mx-auto"
                                    style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}}
                                />
                                <p>
                                    <a href="#ourMission">About us</a>
                                </p>
                            </Col> */}
              <Col md={4} lg={3} xl={3} className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold'>Contact</h6>
                <hr
                  class='mb-2 mt-0 d-inline-block mx-auto'
                  style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                />
                <p><i class='fas fa-envelope mr-3' /> info@getsourcer.com </p>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Copyright section */}
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          2023 © NewsCop
        </div>
      </footer>
    </div>
  )
}
