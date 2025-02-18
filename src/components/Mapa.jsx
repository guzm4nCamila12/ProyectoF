
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = ({setUbicacion}) => {
  const [position, setPosition] = useState({ lat: 4.8088736064112, lng: -75.68756103515626 }); // Ubicación por defecto
  const [loading, setLoading] = useState(true); // Estado de carga mientras obtenemos la ubicación del usuario

  useEffect(() => {
    // Obtenemos la ubicación actual del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Si la geolocalización tiene éxito, actualiza el estado con la latitud y longitud del usuario
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setLoading(false); // Termina la carga cuando obtenemos la ubicación
          setUbicacion([latitude,longitude])
        },
        (error) => {
          // Si ocurre un error, mostramos un mensaje por consola
          console.error('Error al obtener la ubicación:', error);
          setLoading(false); // Termina la carga incluso si hay error
        }
      );
    } else {
      // Si la geolocalización no es soportada
      alert("Tu navegador no soporta la geolocalización.");
      setLoading(false);
    }
  }, []);

  // Función para actualizar la posición del marcador cuando el usuario hace clic
  const MyMapEvents = () => {
    useMapEvent('click', (event) => {
      const { lat, lng } = event.latlng;  // Obtiene las coordenadas del clic
      setPosition({lat, lng});     
      setUbicacion({lat,lng})       // Actualiza la posición
      //console.log('Coordenadas:', lat, lng); // Imprime las coordenadas en consola
    });
    return null;
  };

  if (loading) {
    return <div>Cargando mapa...</div>; // Muestra un mensaje mientras se obtiene la ubicación
  }

  return (
    <div>
      <h2>Seleccione una ubicación en el mapa</h2>
      <MapContainer center={position} zoom={13} style={{ width: '100%', height: '400px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            Ubicación seleccionada: {position[0]}, {position[1]}
          </Popup>
        </Marker>
        <MyMapEvents />  {/* Maneja el clic en el mapa */}
      </MapContainer>
    </div>
  );
};

export default Mapa;

