import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Badge } from '../common/Badge';

// Fix default Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Orange SOC Pin Icon
const orangePin = L.divIcon({
  className: 'custom-soc-pin',
  html: `<div style="
    background: #FF7A00;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 3px solid #ffffff;
    box-shadow: 0 0 12px #FF7A00;
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export const CrimeHeatmap = ({ incidents = [], center = [18.5204, 73.8567], zoom = 12 }) => {
  // Default mock coordinates for Pune / Maharashtra if no specific lat/lng present
  const defaultIncidents = [
    { id: 1, title: 'Hinjewadi Cyber Incident', lat: 18.5912, lng: 73.7389, severity: 'High', type: 'Cybercrime', city: 'Pune' },
    { id: 2, title: 'Shivajinagar Financial Fraud', lat: 18.5314, lng: 73.8446, severity: 'Critical', type: 'Financial Fraud', city: 'Pune' },
    { id: 3, title: 'Kothrud Property Theft', lat: 18.5074, lng: 73.8077, severity: 'Medium', type: 'Theft', city: 'Pune' },
    { id: 4, title: 'Viman Nagar Identity Robbery', lat: 18.5679, lng: 73.9143, severity: 'High', type: 'Robbery', city: 'Pune' },
    { id: 5, title: 'Hadapsar Online Scam', lat: 18.5089, lng: 73.9260, severity: 'Low', type: 'Cybercrime', city: 'Pune' },
  ];

  const mapData = incidents && incidents.length > 0 ? incidents.map((item, idx) => ({
    id: item.id || idx,
    title: item.crimeType || item.description || 'Crime Incident',
    lat: item.lat || (18.5204 + (Math.sin(idx + 1) * 0.05)),
    lng: item.lng || (73.8567 + (Math.cos(idx + 1) * 0.05)),
    severity: item.severity || 'High',
    type: item.crimeType || 'General',
    city: item.city || 'Pune',
    date: item.crimeDate || 'Recent'
  })) : defaultIncidents;

  return (
    <div className="w-full h-[450px] rounded-[24px] overflow-hidden border border-[#2A3246] shadow-2xl relative">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="w-full h-full">
        {/* CartoDB Dark Matter Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Incidents Markers & Heat Circles */}
        {mapData.map((spot) => (
          <React.Fragment key={spot.id}>
            <Circle
              center={[spot.lat, spot.lng]}
              radius={800}
              pathOptions={{
                color: spot.severity === 'Critical' ? '#EF4444' : spot.severity === 'High' ? '#FF7A00' : '#F59E0B',
                fillColor: spot.severity === 'Critical' ? '#EF4444' : spot.severity === 'High' ? '#FF7A00' : '#F59E0B',
                fillOpacity: 0.25,
                stroke: true,
              }}
            />
            <Marker position={[spot.lat, spot.lng]} icon={orangePin}>
              <Popup>
                <div className="p-1 space-y-2 text-left">
                  <div className="flex items-center justify-between gap-2 border-b border-[#2A3246] pb-1.5">
                    <span className="font-bold text-xs text-white">{spot.title}</span>
                    <Badge variant={spot.severity}>{spot.severity}</Badge>
                  </div>
                  <p className="text-xs text-[#9CA3AF]">
                    <strong className="text-white">Category:</strong> {spot.type}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    <strong className="text-white">Location:</strong> {spot.city}
                  </p>
                  {spot.date && (
                    <p className="text-[10px] text-[#6B7280]">Date: {spot.date}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};
