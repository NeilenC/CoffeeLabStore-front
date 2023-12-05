import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import  styles from '../../styles/home.module.css'

function Map () {
  return (
  <MapContainer className={styles.map} center={[ -57.9545300, -34.9214500]} zoom={9} scrollWheelZoom={true}>
    <TileLayer 
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  </MapContainer>
  )
}

export default Map;