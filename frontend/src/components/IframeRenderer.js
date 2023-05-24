import Iframe from 'react-iframe'
import ClipLoader from 'react-spinners/ClipLoader'
import { useState } from 'react'

export default function IframeRenderer ({ url, id, changeBackground }) {
  const [loading, setLoading] = useState(true)
  const [displayFrame, setDisplayFrame] = useState('none')

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
      {loading === true
        ? <ClipLoader
            color='#000'
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
        onLoad={hidespinner}
        display={displayFrame}
        position='relative'
      />
    </div>
  )
}
