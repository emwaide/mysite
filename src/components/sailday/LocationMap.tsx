'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-expect-error – Leaflet typings don't expose _getIconUrl
delete (L.Icon.Default.prototype as { _getIconUrl: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

export type LocationMapProps = {
  lat: number;
  lon: number;
};

export default function LocationMap({ lat, lon }: LocationMapProps) {
  if (!lat || !lon || isNaN(lat) || isNaN(lon)) return null;

  const position: LatLngExpression = [lat, lon];

  return (
    <div className="h-64 w-full rounded-md overflow-hidden shadow">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>
            Your location:
            <br />
            {lat}, {lon}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
