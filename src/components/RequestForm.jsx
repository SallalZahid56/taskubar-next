"use client";

import { useState } from "react";

export default function RequestForm({ services, taskOptions, timelineOptions }) {
  const [task, setTask] = useState("");
  const [service, setService] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("task", task);
      formData.append("service", service);
      formData.append("topic", topic);
      formData.append("description", description);
      formData.append("timeline", timeline);
      if (file) formData.append("file", file);

      const res = await fetch("/api/requests/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Request submitted successfully!");
        console.log("Saved request:", data);

        setTask("");
        setService("");
        setTopic("");
        setDescription("");
        setTimeline("");
        setFile(null);
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Try again.");
    }
  };

  return (
    <form className="space-y-4 flex-1" onSubmit={handleSubmit}>
      {/* Task */}
      <div>
        <label className="block text-sm font-medium mb-1">Task Type</label>
        <select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="">-- Select Task --</option>
          {taskOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Service */}
      <div>
        <label className="block text-sm font-medium mb-1">Service</label>
        <select
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setTopic("");
          }}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="">-- Select Service --</option>
          {Object.keys(services).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Topic */}
      {service && (
        <div>
          <label className="block text-sm font-medium mb-1">Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">-- Select Topic --</option>
            {services[service].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide instructions or requirements"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        ></textarea>
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-sm font-medium mb-1">Timeline</label>
        <select
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="">-- Select Timeline --</option>
          {timelineOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload File</label>
        <input
          type="file"
          accept=".pdf,.csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Submit Request
      </button>
    </form>
  );
}
