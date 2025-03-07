"use client";

import ReportForm from "../components/Reportform";

export default function ReportPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Report a Disaster</h1>
        <ReportForm />
      </div>
    </div>
  );
}
