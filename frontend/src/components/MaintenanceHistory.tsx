// components/MaintenanceHistory.tsx
import React from 'react';

interface MaintenanceEntry {
  id: string;
  type: string;
  description: string;
  date: string;
  technician: string;
  duration: number; // minutes
}

const MaintenanceHistory: React.FC<{ data: MaintenanceEntry[] }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Maintenance History</h3>
      <div className="space-y-3 text-sm">
        {data.map((entry) => (
          <div key={entry.id} className="p-3 bg-gray-50 rounded border">
            <p><strong>{entry.type}</strong> – {entry.description}</p>
            <p>Date: {new Date(entry.date).toLocaleDateString()} | Technician: {entry.technician}</p>
            <p>Duration: {entry.duration} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceHistory;
