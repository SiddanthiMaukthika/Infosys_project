import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt, FaTelegramPlane } from "react-icons/fa";
import "../styles/sosemergency.css";

const LocationMap = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition({ lat, lng });

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            setAddress(data.display_name);
          } catch (error) {
            console.error("Error fetching address:", error);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const validateMobile = () => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust based on country
    return phoneRegex.test(mobile);
  };

  const sendLiveLocation = () => {
    if (!validateMobile()) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!address) {
      alert("Please get your location first.");
      return;
    }
    const message = `🚨 Emergency! My location: ${address}. Contact me at ${mobile}.`;
    window.open(
      `https://wa.me/${mobile}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="sos-page flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 text-center">
        <div className="flex flex-col items-center mb-4">
          <FaMapMarkerAlt className="text-blue-600 text-4xl" />
          <h2 className="text-xl font-semibold mt-2">Send Your Location</h2>
          <p className="text-gray-600 text-sm">
            Share your current location for immediate assistance.
          </p>
        </div>

        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={getLocation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md shadow-md transition-all"
        >
          Get Current Location
        </button>

        {position && (
          <>
            <p className="mt-4 text-gray-700 text-sm">
              <strong>Address:</strong> {address || "Fetching location..."}
            </p>

            <button
              onClick={sendLiveLocation}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md shadow-md flex items-center justify-center mt-4 transition-all"
            >
              SEND MY LIVE LOCATION <FaTelegramPlane className="ml-2" />
            </button>
          </>
        )}
      </div>

      {position && (
        <div className="w-full md:w-2/3 h-[400px] mt-6 md:mt-0 md:ml-6 rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={[position.lat, position.lng]}
            zoom={13}
            className="w-full h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[position.lat, position.lng]}>
              <Popup>You are here</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
