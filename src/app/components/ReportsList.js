"use client";

import formatDate from "@/app/utils/formatDate";

export default function ReportsList({ reports }) {
  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-700 dark:text-white mb-3">Recent Reports</h2>

      <ul>
        {reports.map((report) => (
          <li key={report._id} className="border-b border-gray-300 py-2">
            <p className="text-gray-800 dark:text-white font-semibold">{report.description}</p>
            <p className="text-gray-500 text-sm">{formatDate(report.createdAt)}</p>
            <p className={`text-sm font-bold ${report.status === "critical" ? "text-red-600" : "text-green-600"}`}>
              {report.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
