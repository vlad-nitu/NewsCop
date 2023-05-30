import ProgressLineCustom from './ProgressLineCustom'
import { Button, Container, Row, Col, Card, Accordion } from 'react-bootstrap'
import SideBySideRender from './SideBySideRender'
import { useState, useEffect } from 'react'

/**
 * Displays a list of articles together with their similarities
 * @param items the list of articles which will be displayed
 * @param similarities the list of similarities with the given articles used to display the progress bar
 * @returns {JSX.Element} the element that contains the list
 */

export default function ListURLs ({ sourceUrl, urls, titles, publishers, dates, similarities }) {
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const updateDimensions = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }
  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  if (urls === null || urls.length === 0) {
    return <p>No articles were found</p>
  } else {
    return (

      <div>
        <Row>
          {width >= 992
            ? urls.map((url, index) => (
              <Col xs={12} className='mb-3' key={index}>
                <Card className='d-flex flex-row'>
                  <Container fluid className='d-flex flex-row my-3'>
                    <div className='pe-3 title-wrapper'>
                      <div style={{ fontWeight: 'bold' }}>Title</div>
                      <a href={url} target='_blank' rel='noopener noreferrer' className='forLinks'>
                        {titles[index]}
                      </a>
                    </div>
                    <div className='pe-3 publisher-wrapper'>
                      <div style={{ fontWeight: 'bold' }}>Publisher</div>
                      {/* {prefix the site with // if it does not already include it} */}
                      <a href={publishers[index].startsWith('http://') || publishers[index].startsWith('https://') ? publishers[index] : `//${publishers[index]}`} target='_blank' rel='noopener noreferrer' className='forLinks'>
                        {publishers[index]}
                      </a>
                    </div>
                    <div className='pe-3'>
                      <div style={{ fontWeight: 'bold' }}>Published on</div>
                      <div>{dates[index]}</div>
                    </div>
                    <div className='pe-3 my-auto ms-auto'>
                      <ProgressLineCustom progress={similarities[index]} />
                    </div>
                    <div className='ms-auto my-auto'>
                      {/* Render button */}
                      <Button className='mx-auto custom-outline-button' variant='outline-success' onClick={handleShow}>Compare</Button>
                      {/* Render SideBySideRender component */}
                      <SideBySideRender urlLeft={sourceUrl} urlRight={url} showModal={showModal} handleClose={handleClose} />
                    </div>
                  </Container>
                </Card>
              </Col>
              ))
            : (
            <Accordion>
              {urls.map((url, index) => (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header className='d-flex flex-row'>
                    <div className='pe-3 title-wrapper'>
                      <div style={{ fontWeight: 'bold' }}>Title</div>
                      <a href={url} target='_blank' rel='noopener noreferrer' className='forLinks'>
                        {titles[index]}
                      </a>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className='pe-3 mb-2' style={ {display: 'flex'}} >
                      <div style={{ fontWeight: 'bold' , width: '50%'}}>Publisher</div>
                      {/* {prefix the site with // if it does not already include it} */}
                      <a href={publishers[index].startsWith('http://') || publishers[index].startsWith('https://') ? publishers[index] : `//${publishers[index]}`} target='_blank' rel='noopener noreferrer' className='forLinks'>
                        {publishers[index]}
                      </a>
                    </div>
                    <div className='pe-3 mb-4' style={ {display: 'flex'}}>
                      <div style={{ fontWeight: 'bold', width: '50%'}}>Published on</div>
                      <div>{dates[index]}</div>
                    </div>
                    <div className='my-auto mb-3'>
                      <ProgressLineCustom progress={similarities[index]} />
                    </div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* Render button */}
                      <Button className='mx-auto custom-outline-button' variant='outline-success' onClick={handleShow}>Compare</Button>
                      {/* Render SideBySideRender component */}
                      <SideBySideRender urlLeft={sourceUrl} urlRight={url} showModal={showModal} handleClose={handleClose} />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>)}
        </Row>
      </div>
    )
  }
}
