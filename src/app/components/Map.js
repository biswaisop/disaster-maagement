"use client"; // ✅ Forces this component to run only in the browser

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

export default function Map() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      const res = await fetch("/api/reports");
      const data = await res.json();
      setReports(data);
    }
    fetchReports();
  }, []);

  return (
    <MapContainer center={[20, 78]} zoom={5} className="w-full h-[500px]">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {reports.map((report) => {
        const [lat, lng] = report.location.split(",").map(Number);
        return (
          <Marker key={report._id} position={[lat, lng]}>
            <Popup>
              <b>Description:</b> {report.description} <br />
              <b>Status:</b> {report.status}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
