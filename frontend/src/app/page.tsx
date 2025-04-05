"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/dashboard")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("API error:", err));
  }, []);

  if (!data) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="bg-white text-gray-800 min-h-screen p-10 font-sans">
      <h1 className="text-3xl font-bold">Machine Monitoring Dashboard</h1>
      <p className="text-gray-500 mb-6">Real-time diagnostics and maintenance recommendations</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Machine Status Panel */}
        <div className="flex-1 space-y-6">
          <div className="bg-white border rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Machine Status</h2>
            <div className="flex flex-wrap justify-between text-sm">
              <div>
                <p><strong>Current State:</strong> {data.machine.status}</p>
                <p><strong>Uptime:</strong> {data.machine.uptime}</p>
                <p><strong>Efficiency:</strong> {data.machine.efficiency}</p>
                <p><strong>Operator:</strong> {data.machine.operator}</p>
              </div>
              <div>
                <p><strong>Temperature:</strong> {data.metrics.temperature}</p>
                <p><strong>Pressure:</strong> {data.metrics.pressure}</p>
                <p><strong>Vibration:</strong> {data.metrics.vibration}</p>
                <p><strong>Power:</strong> {data.metrics.power}</p>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <strong>Next Scheduled Maintenance:</strong><br />
              {data.maintenance.next}<br />
              Scheduled: {data.maintenance.date}
            </div>
          </div>
        </div>

        {/* Right: Suggestions */}
        <div className="flex-1 space-y-4">
          <h2 className="text-lg font-semibold">Smart Suggestions</h2>
          {data.suggestions.map((s: any, i: number) => (
            <div key={i} className={`rounded-lg border-l-4 p-4 shadow-sm ${
              s.level === 'high'
                ? 'border-red-500 bg-red-50'
                : s.level === 'medium'
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-green-500 bg-green-50'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{s.title}</h3>
                <span className="uppercase text-xs font-semibold">{s.level}</span>
              </div>
              <p className="text-sm mt-1">{s.description}</p>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                {s.impacts.map((impact: string, j: number) => (
                  <li key={j}>{impact}</li>
                ))}
              </ul>
              <button className="text-sm mt-2 text-blue-600 underline">Run "What-if" Simulation</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
