import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/**
 * A functional React component that renders a container with a link to navigate to the '/compareTexts' page.
 *
 * @param {Object} props - The component props.
 * @param {string} props.prompt - The text to display in the link.
 * @returns {JSX.Element} - The component's markup.
 */
export default function ForwardToCheckTwoTexts ({ prompt }) {
  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <Container className='my-3 d-flex' id='plagiarismCheckerText'>

      <div className='d-flex flex-column justify-content-center mx-auto'>
        <Link
          to='/compareTexts' onClick={handleClick} className='description-paragraph'
          style={{ color: 'black', fontSize: '150%', marginTop: '120px' }}
        >
          {prompt}
        </Link>
      </div>
    </Container>
  )
}
