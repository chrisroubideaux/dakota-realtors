// Maps component
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function Maps() {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const mapContainerStyle = {
    width: '100%',
    height: '50vh',
  };

  const center = {
    lat: 41.8781,
    lng: -87.6298,
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={11}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

{
  /*
import GoogleMapReact from 'google-map-react';

export default function SimpleMap() {
  const chicagoTimeZoneOffset = -5 * 60;

  const defaultProps = {
    center: {
      lat: 41.8781,
      lng: -87.6298,
    },
    zoom: 11,
  };

  return (
    <div
      className="container-fluid card"
      style={{ height: '50vh', width: '100%' }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <div lat={41.8781} lng={-87.6298} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
*/
}
