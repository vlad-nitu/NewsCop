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

  const [statistics, setStatistics] = useState(null)

  /**
   * When the size of the windows are changed call the updateDimensions method
   */
  useEffect(() => {
    async function getStatistics () {
      await axios.get('http://localhost:8000/retireveStatistics/')
        .then(res => {
          console.log(res)
          setStatistics(res.data)
          titles[0] = res.data.stored_articles + titles[0]
          titles[1] = res.data.users + (res.data.users === 1 ? ' user' : ' users')
          titles[2] = res.data.performed_queries + titles[2]
        })
        .catch(error => {
          console.log(error)
        })
    }
    getStatistics()
  }, [titles])

  // const statistics = {
  //   "users": 32,
  //   "performed_queries": 43,
  //   "stored_articles": 140,
  //   "similarities_retrieved": [10, 15, 8, 2, 10]
  // }

  const colors = ['#F06060', '#35A0CE', '#3C8A49', '#963A87', '#DC9326']
  const percentages = ['0 - 20%', '20 - 40%', '40 - 60%', '60 - 80%', '80 - 100%']

  const bars = statistics == null
    ? []
    : statistics.similarities_retrieved.map((statistic, index) => {
      return {
        ratio: statistics.performed_queries === 0 ? 0 : ((statistic / statistics.similarities_retrieved.reduce(function (acc, val) { return acc + val }, 0)) * 100),
        color: colors[index],
        articles: statistic,
        percentages: percentages[index]
      }
    })

  if (statistics != null) {
    // Renders a JSX element with information about statistics.
    return (
      <div id='statistics' data-testid='statistics'>
        <Container className='py-5'>
          <h2 className='statistics-title'>Did you know that...</h2>
          <Row className='pt-4'>
            {titles.map((title, index) => (
              <Col key={index} xs={12} sm={12} md={4} lg={4} className='pb-3'>
                <Card className='custom-statistics-card text-center py-5'>
                  <img alt={`Service ${index + 1}`} src={images[index]} style={{ height: '64px', width: '64px' }} className='mx-auto pb-1' />
                  <Card.Body className='pb-0'>
                    <Card.Title className='fw-bold fs-4 m-0'>{title}</Card.Title>
                    <Card.Text>
                      {descriptions[index]}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className='pt-5'>

            <div id='bar-statistics' className='d-flex flex-lg-row flex-column'>
              <div id='left-side-text' className='mt-auto flex-shrink-1 pe-5' style={{ width: '350px' }}>
                <p className='fs-4 fw-bolder m-0'>Number of overlapping articles for each threshold</p>
                <p className='fs-5 text-muted mt-0'>from the last URL similarity checks</p>
              </div>
              <div className='d-flex flex-row flex-grow-1 pt-3 pt-lg-0'>
                {bars.map((bar, index) => {
                  return (
                    <div
                      key={index} id={`bar${index}`}
                      className={`flex-grow-1 ${index === bars.length - 1 ? '' : 'pe-2'}`}
                    >
                      <div style={{ height: '300px' }} className='custom-width position-relative mx-auto'>
                        <div className='rounded shadow bar-statistic-vertical position-absolute'>
                          <div
                            className='custom-rounded' style={{
                              position: 'absolute',
                              bottom: 0,
                              height: `max(20%, ${bar.ratio}%`,
                              width: '100%',
                              backgroundColor: bar.color
                            }}
                          >
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

          </div>
        </Container>
      </div>
    )
  }
}
