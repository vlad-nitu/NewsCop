import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div className="pin1"></div>

export default function Map() {
  const defaultProps = {
    center: {
      lat: 51.999631,
      lng: 4.378186
    },
    zoom: 15
  };

  const overlappingStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: '1'
  };

  // TODO: Do conditional rendering based on the device's screen size and do two renderings.
  // The renderings differ mostly on the position of the "location" box
  // Also, consider the option of *NOT* rendering the map on small devices.
  return (
    <div style={{ height: '400px', width: '100%' }}>
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <GoogleMapReact
                // bootstrapURLKeys={{ key: "AIzaSyAkx3vm6dc9d__QyOw9zy14pZwSfl_U8_s" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                lat={51.999631}
                lng={4.378186}
                text="My Marker"
                />
            </GoogleMapReact>
            <div className="pt-3" style={{ position: 'absolute', left: '100px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#fff', padding: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
                <h2 className="title" style={{color: 'black'}}>Location</h2>
                <p>Van Mourik Broekmanweg 5, 2628 XE Delft</p>
            </div>
        </div>
    </div>
  );

}