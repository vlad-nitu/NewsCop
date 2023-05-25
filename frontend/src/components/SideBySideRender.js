import { Row, Col, Container, Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import IframeRenderer from './IframeRenderer'
import { useState } from 'react'

/**
 * SideBySideRender is a component for displaying two iframes side by side.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.urlLeft - The URL to load in the left iframe.
 * @param {string} props.urlRight - The URL to load in the right iframe.
 * @param {boolean} props.showModal - Controls the visibility of the modal.
 * @param {function} props.handleClose - Function to call when the modal needs to be closed.
 *
 * @returns {JSX.Element} The SideBySideRender component.
 */
export default function SideBySideRender ({ urlLeft, urlRight, showModal, handleClose }) {
  const [backgroundColorLeft, setBackgroundColorLeft] = useState('#fff')
  const [backgroundColorRight, setBackgroundColorRight] = useState('#fff')

  return (
    <Modal show={showModal} onHide={handleClose} fullscreen>
      <ModalHeader>
        <a onClick={() => { handleClose(); setBackgroundColorLeft('#fff') }} className='custom_cursor'>
          <FontAwesomeIcon icon={faChevronLeft} className='pe-1' />
          <span>Go back</span>
        </a>
      </ModalHeader>
      <ModalBody style={{ padding: 0 }}>
        <div className='d-flex flex-column' style={{ height: '100%', backgroundColor: backgroundColorLeft === backgroundColorRight && backgroundColorLeft === '#000' ? '#000' : '#fff' }}>
          <Container fluid style={{ height: '100%' }}>
            <Row style={{ height: '100%' }}>
              {/* px-0 pe-sm-2: no x-axis padding on 'xs' devices and from 'sm' to 'xl' devices add 1rem padding-right. */}
              {/* pb-2 pb-sm-0: padding-bottom on 'xs' devices and from 'sm' to 'xl' devices remove padding bottom (required splitting page horizontally on small devices). */}
              {/* custom-iframe-height: on small devices, set height of each frame to 50%, while on the other screens set it to 100%. */}
              <Col sm={6} className='px-0 pe-sm-2 pb-2 pb-sm-0 custom-iframe-height' id='left_article'>
                <IframeRenderer url={urlLeft} id='left_article' changeBackground={() => setBackgroundColorLeft('#000')} />
              </Col>
              <Col sm={6} className='px-0 ps-sm-2 pt-2 pt-sm-0 custom-iframe-height' id='right_article'>
                <IframeRenderer url={urlRight} id='right_article' changeBackground={() => setBackgroundColorRight('#000')} />
              </Col>
            </Row>
          </Container>
        </div>
      </ModalBody>
    </Modal>
  )
}
