import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = ({ setUbicacion, ubicacion }) => {
  const [position, setPosition] = useState(ubicacion || { lat: 3.843792824199103, lng: -72.72583097219469 });

  // Actualiza la posición cada vez que 'ubicacion' cambie
  useEffect(() => {
    if (ubicacion) {
      setPosition(ubicacion);
    }
  }, [ubicacion]);

  // Función para actualizar la posición del marcador cuando el usuario hace clic
  const MyMapEvents = () => {
    useMapEvent('click', (event) => {
      const { lat, lng } = event.latlng;  // Obtiene las coordenadas del clic
      setPosition({ lat, lng });
      setUbicacion({ lat, lng });  // Actualiza la posición
    });
    return null;
  };

  return (
    <div>
      <h2>Seleccione una ubicación en el mapa</h2>
      <MapContainer center={position} zoom={6} style={{ width: '100%', height: '400px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            Ubicación seleccionada: {position.lat}, {position.lng}
          </Popup>
        </Marker>
        <MyMapEvents />  {/* Maneja el clic en el mapa */}
      </MapContainer>
    </div>
  );
};

export default Mapa;