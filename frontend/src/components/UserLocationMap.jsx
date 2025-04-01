import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ResizeObserver from "resize-observer-polyfill"; // Ensures map resizes properly

// Custom pin icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Component to handle map click events
const LocationMarker = ({ setLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      setLocation({ lat, lng });
    },
  });

  return markerPosition ? <Marker position={markerPosition} icon={customIcon} /> : null;
};

const UseLocationMap = ({ width = "100%", height = "90%", location, setLocation }) => {
  const [useGPS, setUseGPS] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const mapContainerRef = useRef(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const MAPTILER_API_KEY = "ux1Y2O4EPDq3jCSXV3Ln"; // Replace with your MapTiler API key

  const getLoc = async () => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser");
      setUseGPS(false);
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        setErrorMessage(error.message);
        setUseGPS(false);
      }
    );
  };
  

  useEffect(() => {
    getLoc()
  }, [useGPS]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setMapSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      if (mapContainerRef.current) {
        observer.unobserve(mapContainerRef.current);
      }
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width, height, position: "relative", border: "1px solid #ddd" }}>
      {/* Leaflet Map */}
      <MapContainer center={[location.lat, location.lng]} zoom={useGPS ? 14 : 7} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
        />
        <Marker position={[location.lat, location.lng]} icon={customIcon} />
        <LocationMarker setLocation={setLocation} />
      </MapContainer>

      {/* Buttons */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          gap: "15px",
          background: "rgba(0, 0, 0, 0.6)",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <button
          onClick={() => setUseGPS(false)}
          style={{
            backgroundColor: !useGPS ? "#007bff" : "#555",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "8px",
            transition: "0.3s",
          }}
        >
          📍 Pin Location
        </button>

        <button
          onClick={() => setUseGPS(true)}
          style={{
            backgroundColor: useGPS ? "#28a745" : "#555",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "8px",
            transition: "0.3s",
          }}
        >
          📡 Get My Location
        </button>
      </div>

      {/* Display Selected Location */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#333",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        📍 Selected Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          ⚠️ {errorMessage}
        </div>
      )}
    </div>
  );
};

export default UseLocationMap;
