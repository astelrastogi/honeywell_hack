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
      <div className="space-y-6">
        {data.map((sensor) => (
          <div key={sensor.id} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
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

            {sensor.history && sensor.history.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={sensor.history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tick={{ fontSize: 10 }}
                    hide={sensor.history.length > 10} // hides labels for dense data
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    domain={['auto', 'auto']}
                    allowDecimals={true}
                  />
                  <Tooltip
                    labelStyle={{ fontSize: 12 }}
                    itemStyle={{ fontSize: 12 }}
                    formatter={(value: number) => [`${value} ${sensor.unit}`, sensor.name]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={
                      sensor.status === 'normal'
                        ? '#16a34a'
                        : sensor.status === 'warning'
                        ? '#ca8a04'
                        : '#dc2626'
                    }
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-500 italic">No history available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SensorReadings;
