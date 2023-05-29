import ProgressLineCustom from './ProgressLineCustom'
import { Button, ListGroup } from 'react-bootstrap'
import SideBySideRender from './SideBySideRender'
import { useState } from 'react'

/**
 * Displays a list of articles together with their similarities
 * @param items the list of articles which will be displayed
 * @param similarities the list of similarities with the given articles used to display the progress bar
 * @returns {JSX.Element} the element that contains the list
 */

export default function ListURLs ({ source_url, urls, titles, publishers, dates, similarities }) {
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  if (urls === null || urls.length === 0) {
    return <p>No articles were found</p>
  } else {
    return (
      <div>
        <div style={{ float: 'left', fontSize: '28px', marginTop: '8vh', marginBottom: '2vh' }}>
          We found the following similar articles:
        </div>
        <div style={{ clear: 'both', borderTop: '1px solid #000', paddingTop: '2vh' }} /> {/* Clear the float */}
        <ListGroup style={{ marginLeft: '0' }}> {/* Set marginLeft to 0 to align with the left-aligned div */}
          {urls.map((url, index) => (
            <ListGroup.Item key={index} style={{ marginBottom: '3vh', borderRadius: '8px', border: '1px solid #000', display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: '1' }}>
                <div>Title</div>
                <a href={url} target='_blank' rel='noopener noreferrer' style={{ display: 'block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', color: '#000' }}>
                  {titles[index]}
                </a>
              </div>
              <div style={{ flex: '1' }}>
                <div>Publisher</div>
                <a href={publishers[index]} target='_blank' rel='noopener noreferrer' style={{ display: 'block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', color: '#000' }}>
                  {publishers[index]}
                </a>
              </div>
              <div style={{ flex: '1' }}>
                {dates[index] !== '' && (<div>Date</div>)}

                {dates[index]}
              </div>
              <div style={{ flex: '1' }}>
                <ProgressLineCustom progress={similarities[index]} />
              </div>
              <div>
                {/* Render button */}
                <Button className='mx-auto custom-outline-button' variant='outline-success' onClick={handleShow}>Compare</Button>

                {/* Render SideBySideRender component */}
                <SideBySideRender urlLeft={source_url} urlRight={url} showModal={showModal} handleClose={handleClose} />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }
}
