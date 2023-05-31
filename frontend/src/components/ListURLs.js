import ProgressLineCustom from './ProgressLineCustom'
import { Button, Container, Row, Col, Card, Accordion } from 'react-bootstrap'
import SideBySideRender from './SideBySideRender'
import { useState, useEffect } from 'react'

/**
 * Displays a list of articles (title, publisher, date) together with their similarities.
 * If the width of the page on which the component is displayed is smaller or equal than 992, the list items will
 * be displayed in an Accordion expandable component.
 * @param sourceUrl the url of the input article used for the side-by-side rendering
 * @param articles the list of similar articles to be displayed
 * @returns {JSX.Element} the element that contains the list
 */

export default function ListURLs ({ sourceUrl, articles }) {
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const [width, setWidth] = useState(window.innerWidth)

  /**
   * Update the width on resizing
   */
  const updateDimensions = () => {
    setWidth(window.innerWidth)
  }

  /**
   * When the size of the windows are changed call the updateDimensions method
   */
  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  if (articles.length === 0) {
    return <p>No articles were found</p>
  } else {
    return (

      <div>
        <Row>
          {width >= 992
            ? articles.map((article, index) => (
              <Col xs={12} className='mb-3' key={index}>
                <Card className='d-flex flex-row'>
                  <Container fluid className='d-flex flex-row my-3'>
                    <div className='pe-3 title-wrapper'>
                      <div style={{ fontWeight: 'bold' }}>Title</div>
                      <a href={article.url} target='_blank' rel='noopener noreferrer' className='forLinks'>
                        {article.title}
                      </a>
                    </div>
                    <div className='pe-3 publisher-wrapper'>
                      <div style={{ fontWeight: 'bold' }}>Publisher</div>
                      {/* {prefix the site with // if it does not already include it} */}
                      <a href={article.publisher.startsWith('http://') || article.publisher.startsWith('https://') ? article.publisher : `//${article.publisher}`} target='_blank' rel='noopener noreferrer' className='forLinks'>
                        {article.publisher}
                      </a>
                    </div>
                    <div className='pe-3'>
                      <div style={{ fontWeight: 'bold' }}>Published on</div>
                      <div>{article.date}</div>
                    </div>
                    <div className='pe-3 my-auto ms-auto'>
                      <ProgressLineCustom progress={article.similarity} />
                    </div>
                    <div className='ms-auto my-auto'>
                      {/* Render button */}
                      <Button className='mx-auto custom-outline-button' variant='outline-success' onClick={handleShow}>Compare</Button>
                      {/* Render SideBySideRender component */}
                      <SideBySideRender urlLeft={sourceUrl} urlRight={article.url} showModal={showModal} handleClose={handleClose} />
                    </div>
                  </Container>
                </Card>
              </Col>
              ))
            : (
              <Accordion alwaysOpen>
                {articles.map((article, index) => (
                  <Accordion.Item eventKey={index} key={index} style={{ marginBottom: '20px' }}>
                    <Accordion.Header className='d-flex flex-row'>
                      <div className='pe-3 title-wrapper'>
                        <div style={{ fontWeight: 'bold' }}>Title</div>
                        <a href={article.url} target='_blank' rel='noopener noreferrer' className='forLinks'>
                          {article.title}
                        </a>
                      </div>
                    </Accordion.Header>
                    {/* <Card style={{ marginBottom: '10px' }}> */}
                    <Accordion.Body>
                      <div className='pe-3 mb-2' style={{ display: 'flex' }}>
                        <div style={{ fontWeight: 'bold', width: '50%' }}>Publisher</div>
                        {/* {prefix the site with // if it does not already include it} */}
                        <a href={article.publisher.startsWith('http://') || article.publisher.startsWith('https://') ? article.publisher : `//${article.publisher}`} target='_blank' rel='noopener noreferrer' className='forLinks'>
                          {article.publisher}
                        </a>
                      </div>
                      <div className='pe-3 mb-4' style={{ display: 'flex' }}>
                        <div style={{ fontWeight: 'bold', width: '50%' }}>Published on</div>
                        <div>{article.date}</div>
                      </div>
                      <div className='my-auto mb-3'>
                        <ProgressLineCustom progress={article.similarity} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Render button */}
                        <Button className='mx-auto custom-outline-button' variant='outline-success' onClick={handleShow}>Compare</Button>
                        {/* Render SideBySideRender component */}
                        <SideBySideRender urlLeft={sourceUrl} urlRight={article.url} showModal={showModal} handleClose={handleClose} />
                      </div>
                    </Accordion.Body>
                    {/* </Card> */}

                  </Accordion.Item>
                ))}
              </Accordion>)}
        </Row>
      </div>
    )
  }
}
