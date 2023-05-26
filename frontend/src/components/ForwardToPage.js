import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/**
 * A functional React component that renders a container with a link to navigate to a specific page.
 *
 * @param {Object} props - The component props.
 * @param {string} props.page - The destination page for the link.
 * @param {string} props.prompt - The text to display in the link.
 * @returns {JSX.Element} - The component's markup.
 */
export default function ForwardToPage ({ page, prompt }) {
  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  return (
    <Container className='my-3 d-flex' id='plagiarismCheckerText'>
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <Link
          to={page}
          onClick={handleClick}
          className='description-paragraph'
          style={{ color: 'black', fontSize: '150%', marginTop: '120px' }}
        >
          {prompt}
        </Link>
      </div>
    </Container>
  )
}
