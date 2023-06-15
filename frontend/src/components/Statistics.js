import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 *
 * A component that renders three statistics cards, each with an image, a title, and a description.
 *
 * @param {string[]} titles - The titles for each statistics card.
 * @param {string[]} descriptions - The descriptions for each statistics card.
 * @param {string[]} images - The URLs for each image to be displayed on each statistics card.
 * @throws {Error} Will throw an error if the length of the titles array is different from the length of the descriptions array,
 the length of the images array, or if the length of the descriptions array is different from the length of the images array.
 *
 * @returns {JSX.Element} Returns a JSX element that renders the three statistics cards with the provided titles, descriptions, and images.
 *
 */
export default function Statistics ({ titles, descriptions, images }) {
  if (titles.length !== descriptions.length ||
        titles.length !== images.length ||
        descriptions.length !== images.length) {
    throw Error('Different lengths of the arrays.')
  }

  const [width, setWidth] = useState(window.innerWidth)
  const [statistics, setStatistics] = useState(null)

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

    async function getStatistics() {
      await axios.get('http://localhost:8000/retireveStatistics/')
      .then(res => {
        console.log(res)
        setStatistics(res.data)
        titles[0] = res.data.stored_articles + titles[0]
        titles[1] = res.data.users + titles[1]
        titles[2] = res.data.performed_queries + titles[2]
      })
      .catch(error => {
        console.log(error)
      })
    }

    getStatistics()
    
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // const statistics = {
  //   "users": 32, 
  //   "performed_queries": 43, 
  //   "stored_articles": 140, 
  //   "similarities_retrieved": [10, 15, 8, 2, 10]
  // }

  const colors = ['#000', '#000', '#000', '#000', '#000']
  const percentages = ['0 - 20%', '20 - 40%', '40 - 60%', '60 - 80%', '80 - 100%']

  const bars = statistics == null ? [] : statistics.similarities_retrieved.map((statistic, index) => {
    return {
      "ratio": statistics.performed_queries === 0 ? 0 : ((statistic / statistics.similarities_retrieved.reduce(function(acc, val) { return acc + val; }, 0)) * 100),
      "color": colors[index],
      "articles": statistic,
      "percentages": percentages[index]
    }
  })

  // Renders a JSX element with information about statistics.
  return (
    <div id='statistics'>
      <Container className='py-5'>
        <h2 className='statistics-title'>Did you know that...</h2>
        <Row className='pt-4'>
          {statistics != null ? titles.map((title, index) => (
            <Col key={index} xs={12} sm={12} md={4} lg={4} className='mb-3 align-items-stretch'>
              <Card className='custom-statistics-card text-center mt-3 h-100'>
                <Card.Img alt={`Service ${index + 1}`} src={images[index]} className='card-img mx-auto' />
                <Card.Body className='d-flex flex-column px-0'>
                  <Card.Title className='fw-bold'>{title}</Card.Title>
                  <Card.Text className='mb-4'>
                    {descriptions[index]}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )) : (<div></div>)}
        </Row>
        <div className='pt-5'>
          {statistics != null
            ? (
              <div id='bar-statistics' className='d-flex flex-lg-row flex-column'>
                <div id='left-side-text' className='mt-auto flex-shrink-1 pe-5' style={{ width: '350px' }}>
                  <p className='fs-4 fw-bolder m-0'>Number of articles for each overlap threshold</p>
                  <p className='fs-5 text-muted mt-0'>from our database</p>
                </div>
                <div className="d-flex flex-row flex-grow-1 pt-3 pt-lg-0">
                  {bars.map((bar, index) => {
                    return (
                      <div id={`bar${index}`} className={`flex-grow-1 ${index === bars.length - 1 ? '' : 'pe-2'}`}>
                        <div style={{ height: '300px' }} className='custom-width position-relative mx-auto'>
                          <div className='rounded shadow bar-statistic-vertical position-absolute'>
                            <div className='custom-rounded' style={{ position: 'absolute', bottom: 0, height: `max(20%, ${bar.ratio}%`, width: '100%', backgroundColor: bar.color }}>
                              <p className='text-white fw-normal fs-6 pt-2 text-center m-0'>{bar.articles}</p>
                              <p className='text-white fw-normal fs-7 text-center m-0'>articles</p>
                            </div>
                          </div>
                        </div>
                        <p className='text-muted fs-6 text-center pt-3'>{bar.percentages}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              )
            : (
              <div />
              )}
        </div>
      </Container>
    </div>
  )
}
