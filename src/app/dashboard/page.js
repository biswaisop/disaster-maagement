"use client";

import GoogleMapComponent from "@/app/components/GoogleMap";
import Sidebar from "@/app/components/Sidebar";
import ReportsList from "@/app/components/ReportsList";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/reports");
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
    fetchReports();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for Statistics */}
      <Sidebar reports={reports} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Disaster Response Dashboard
        </h1>

        {/* Google Map */}
        <GoogleMapComponent reports={reports} />

        {/* Recent Reports List */}
        <ReportsList reports={reports} />
      </div>
    </div>
  );
}
