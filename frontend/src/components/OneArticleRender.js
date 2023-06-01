import { Container, Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import IframeRenderer from './IframeRenderer'
import { useState } from 'react'

export default function OneArticleRender ({ url, showModal, handleClose }) {
  const [backgroundColor, setBackgroundColor] = useState('#fff')

  return (
    <Modal show={showModal} onHide={handleClose} fullscreen>
      <ModalHeader>
        <a title='close_button' onClick={() => { handleClose(); setBackgroundColor('#fff') }} className='custom_cursor'>
          <FontAwesomeIcon icon={faChevronLeft} className='pe-1' />
          <span>Go back</span>
        </a>
      </ModalHeader>
      <ModalBody style={{ padding: 0 }}>
        <div title='wrapper' className='d-flex flex-column' style={{ height: '100%', backgroundColor: backgroundColor === '#000' ? '#000' : '#fff' }}>
          <Container fluid style={{ height: '100%' }}>
            <IframeRenderer url={url} id='one_article' changeBackground={() => setBackgroundColor('#000')} />
          </Container>
        </div>
      </ModalBody>
    </Modal>
  )
}
