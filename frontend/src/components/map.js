/**
 * Map Component.
 *
 * @return {JSX.Element} The Google Map component with a marker on a specific location.
 */
export default function Map () {
  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(./map.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <div style={backgroundStyle} data-testid='backgroundStyle' />
        <div className='pt-3' style={{ position: 'absolute', left: '100px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#fff', padding: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
          <h2 className='title' style={{ color: 'black' }}>Location</h2>
          <p>Van Mourik Broekmanweg 5, 2628 XE Delft</p>
        </div>
      </div>
    </div>
  )
}
