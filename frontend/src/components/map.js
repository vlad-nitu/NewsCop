import GoogleMapReact from 'google-map-react'

/**
 *
 * @returns HTML Element representing a pin for the map
 */
const AnyReactComponent = () => <div className='pin1' />

/**
 * Renders a Google Map component with a marker on a specific location.
 *
 * The entire components was built following the tutorial from:
 * https://www.npmjs.com/package/google-map-react
 *
 * TODO: Do conditional rendering based on the device's screen size and do two renderings.
 * The renderings differ mostly on the position of the "location" box.
 * Also, consider the option of NOT rendering the map on small devices.
 *
 * @return {JSX.Element} The Google Map component with a marker on a specific location.
 */
export default function Map () {
  // The default props for the Google Map component.
  const defaultProps = {
    center: {
      lat: 51.999631,
      lng: 4.378186
    },
    zoom: 15
  }

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(./map.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  // TODO: Do conditional rendering based on the device's screen size and do two renderings.
  // The renderings differ mostly on the position of the "location" box
  // Also, consider the option of *NOT* rendering the map on small devices.
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <div style={backgroundStyle} />
        <div className='pt-3' style={{ position: 'absolute', left: '100px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#fff', padding: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
          <h2 className='title' style={{ color: 'black' }}>Location</h2>
          <p>Van Mourik Broekmanweg 5, 2628 XE Delft</p>
        </div>
      </div>
    </div>
  )
}
