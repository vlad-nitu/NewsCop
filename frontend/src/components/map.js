import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

/**
 * Map Component.
 * It uses the component from: https://react-leaflet.js.org/
 * @return {JSX.Element} The Map component with a marker on a specific location.
 */
export default function Map () {
  const position = [51.999512, 4.377728]

  return (
    <div data-testid='map'>
      <MapContainer
        className='markercluster-map'
        center={position}
        zoom={17}
        maxZoom={18}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={position}>
          <Popup>
            Van Mourik Broekmanweg 5, 2628 XE Delft
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
