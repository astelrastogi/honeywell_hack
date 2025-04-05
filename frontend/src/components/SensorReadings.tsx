'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

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
      <div className="space-y-8">
        {data.map((sensor) => (
          <div key={sensor.id} className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{sensor.name}</span>
              <span
                className={`font-semibold ${
                  sensor.status === 'normal'
                    ? 'text-green-600'
                    : sensor.status === 'warning'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {sensor.value} {sensor.unit}
              </span>
            </div>

            {sensor.history && sensor.history.length > 0 && (
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <LineChart data={sensor.history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} hide />
                    <YAxis unit={sensor.unit} />
                    <Tooltip
                      formatter={(value: number) => [`${value} ${sensor.unit}`, 'Value']}
                      labelFormatter={(label: string) =>
                        new Date(label).toLocaleString()
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SensorReadings;
