// maps component
import GoogleMapReact from 'google-map-react';

export default function SimpleMap() {
  const chicagoTimeZoneOffset = -5 * 60; // Chicago is in UTC-5

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
