// components/SensorReadings.tsx
import React from 'react';

interface Sensor {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  history?: { timestamp: string; value: number }[];
}

const SensorReadings: React.FC<{ data: Sensor[] }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Sensor Readings</h3>
      <div className="space-y-4">
        {data.map(sensor => (
          <div key={sensor.id} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex justify-between">
              <span className="font-medium">{sensor.name}</span>
              <span className={`font-semibold ${
                sensor.status === 'normal' ? 'text-green-600' :
                sensor.status === 'warning' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {sensor.value} {sensor.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SensorReadings;
