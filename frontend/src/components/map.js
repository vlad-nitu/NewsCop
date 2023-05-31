import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map () {
  const coordinates = [51.999553, 4.377812]
  return (
      <MapContainer
        className="markercluster-map"
        center={coordinates}
        zoom={17}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
}
