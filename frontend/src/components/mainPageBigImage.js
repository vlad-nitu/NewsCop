/**
 * A functional component that renders a big image with a black overlay and text on top.
 *
 * @param {string} description - The description of the project.
 * @param {string} projectName - The name of the project.
 * @param {string} imageUrl - The URL of the image to be displayed in the background.
 * @returns {JSX.Element} - A JSX element representing the main page big image.
 */
export default function MainPageBigImage ({ description, projectName, imageUrl }) {
  // Define the styles for the container, background, overlay, and text.
  const containerStyle = {
    height: '90svh', /* svh - The small viewport-percentage units (sv*) are defined with respect to the small viewport size: the viewport sized assuming any UA interfaces that are dynamically expanded and retracted to be expanded. */
    width: 'auto',
    position: 'relative'
  }

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(2px)', // add a 2px blur effect to the background
    WebkitBackdropFilter: 'blur(2px)', // add a 2px blur effect to the background for Safari
    zIndex: -1 // set a negative z-index to position the background behind the content
  }

  const overlayStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // add a black overlay with 50% opacity
    zIndex: -1 // set a negative z-index to position the overlay behind the content
  }

  const textStyle = {
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    width: 'auto'
  }

  // Return the JSX element with the container, background, overlay, and text elements.
  return (
    <div style={containerStyle}>
      <div id='background-image' style={backgroundStyle} />
      <div style={overlayStyle} />
      <div style={textStyle}>
        <h2 className='title'>{projectName}</h2>
        <p className='description-paragraph'>{description}</p>
      </div>
    </div>
  )
}
