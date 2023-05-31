import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

/**
 * Map Component.
 *
 * @return {JSX.Element} The Map component with a marker on a specific location.
 */
export default function Map () {

  const position = [51.999512, 4.377728]

  return (
    <MapContainer
      className="markercluster-map"
      center={position}
      zoom={17}
      maxZoom={18}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
