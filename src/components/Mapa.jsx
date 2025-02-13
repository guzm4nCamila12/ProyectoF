/*import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Mapa = () => {
  const [latLng, setLatLng] = useState({ lat: 4.804140152569989, lng:  -75.69264156398599 });

  // Manejar el clic en el mapa
  const onMapClick = (e) => {
    const newLatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setLatLng(newLatLng); // Actualiza el estado con la nueva latitud y longitud

    // Imprimir en consola las coordenadas seleccionadas
    console.log("Latitud:", newLatLng.lat);
    console.log("Longitud:", newLatLng.lng);
  };

  return (
    <div>
      <h3>Selecciona un punto en el mapa</h3>
      <div>
        Latitud: <span>{latLng.lat}</span>
      </div>
      <div>
        Longitud: <span>{latLng.lng}</span>
      </div>

      <LoadScript googleMapsApiKey="AIzaSyAvf8mn1G7XKiwXMVqqroB_ur8snF_kjAo">
        <GoogleMap
          id="map"
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={latLng} // El centro inicial del mapa es el valor de latLng
          zoom={8}
          onClick={onMapClick} // Cuando el usuario hace clic en el mapa
          options={{
            // Cambia el estilo del puntero del mapa
            gestureHandling: "greedy", // Permite gestos como el zoom o el desplazamiento
          }}
        >
          {/* El marcador se coloca en la posición de latLng */
          /*<Marker position={latLng} />
        </GoogleMap>
      </LoadScript>

  
    </div>
  );
};

export default Mapa;
*/




import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = () => {
  const [position, setPosition] = useState([4.8088736064112, -75.68756103515626]); // Ubicación inicial

  // Función para actualizar la posición del marcador cuando el usuario hace clic
  const MyMapEvents = () => {
    useMapEvent('click', (event) => {
      const { lat, lng } = event.latlng;  // Obtiene las coordenadas del clic
      setPosition([lat, lng]);            // Actualiza la posición
      console.log('Coordenadas:', lat, lng); // Imprime las coordenadas en consola
    });
    return null;
  };

  return (
    <div>
      <h2>Seleccione una ubicación en el mapa</h2>
      <MapContainer center={position} zoom={13} style={{ width: '100%', height: '500px' }}>
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



