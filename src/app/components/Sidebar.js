"use client";

export default function Sidebar({ reports }) {
  const totalReports = reports.length;
  const criticalReports = reports.filter((r) => r.status === "critical").length;
  const activeRescues = reports.filter((r) => r.status === "rescue in progress").length;

  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Overview</h2>

      <div className="mb-4">
        <p className="text-gray-500">Total Reports</p>
        <p className="text-2xl font-bold text-blue-600">{totalReports}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-500">Critical Disasters</p>
        <p className="text-2xl font-bold text-red-600">{criticalReports}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-500">Active Rescues</p>
        <p className="text-2xl font-bold text-green-600">{activeRescues}</p>
      </div>
    </div>
  );
}
