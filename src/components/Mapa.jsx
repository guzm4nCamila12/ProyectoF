import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Mapa = () => {
  const [latLng, setLatLng] = useState({ lat: -34.397, lng: 150.644 });

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
          {/* El marcador se coloca en la posición de latLng */}
          <Marker position={latLng} />
        </GoogleMap>
      </LoadScript>

  
    </div>
  );
};

export default Mapa;