"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 20, lng: 78 }; // Default to India

export default function GoogleMapComponent({ reports }) {
  return (
    <LoadScript googleMapsApiKey={"AIzaSyDJhr4mHJ4Kth61z3hYrI0BjHi0fqIWr-g"}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={5}>
        {reports.map((report) => {
          const [lat, lng] = report.location.split(",").map(Number);
          return <Marker key={report._id} position={{ lat, lng }} />;
        })}
      </GoogleMap>
    </LoadScript>
  );
}
