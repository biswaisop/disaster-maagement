"use client";

import { useState, useEffect } from "react";

export default function ReportForm() {
  const [form, setForm] = useState({
    type: "",
    description: "",
    severity: "moderate",
    location: "", // Auto-filled
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Automatically get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setForm((prev) => ({ ...prev, location: `${latitude},${longitude}` }));
        },
        (error) => {
          console.error("Geolocation Error:", error);
          setMessage("⚠️ Location access denied. Please enter manually.");
        }
      );
    }
  }, []);

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Submit form data
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("✅ Report submitted successfully!");
        setForm({ type: "", description: "", severity: "moderate", location: form.location });
      } else {
        setMessage("❌ Error submitting report. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 dark:text-white">Disaster Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Type</option>
          <option value="earthquake">Earthquake</option>
          <option value="flood">Flood</option>
          <option value="fire">Fire</option>
          <option value="hurricane">Hurricane</option>
          <option value="landslide">Landslide</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 dark:text-white">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-white">Severity</label>
        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="moderate">Moderate</option>
          <option value="severe">Severe</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 dark:text-white">Location (Auto-filled)</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Submit Report"}
      </button>

      {message && <p className="text-center text-sm font-semibold mt-2">{message}</p>}
    </form>
  );
}
