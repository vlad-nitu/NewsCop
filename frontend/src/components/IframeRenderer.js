import Iframe from 'react-iframe'
import ClipLoader from 'react-spinners/ClipLoader'
import { useState } from 'react'

/**
 * Renders an iframe component with a loading spinner until website loads successfully.
 *
 * @param {object} props - The component props.
 * @param {string} props.url - The URL for the iframe.
 * @param {string} props.id - The ID of the iframe.
 * @param {function} props.changeBackground - The function to change the background.
 * @returns {JSX.Element} The JSX element representing the iframe renderer.
 */
export default function IframeRenderer ({ url, id, changeBackground }) {
  const [loading, setLoading] = useState(true)
  const [displayFrame, setDisplayFrame] = useState('none')

  /**
   * Callback function to hide the spinner and display the iframe.
  */
  const hidespinner = () => {
    setLoading(false)
    setDisplayFrame('block')
    changeBackground()
  }

  const override = {
    display: 'block',
    margin: '0 auto'
  }

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* While the website is still loading, display the spinning circle. */}
      {loading === true
        ? <ClipLoader
            color='rgb(46, 131, 126)'
            size={100}
            loading={loading}
            aria-label='Loading Spinner'
            data-testid='loader'
            cssOverride={override}
          />

        : null}
      <Iframe
        url={url}
        width='100%'
        height='100%'
        id={id}
        onLoad={hidespinner} // once the website is loaded, then the loading screen is hidden
        display={displayFrame}
        position='relative'
      />
    </div>
  )
}
