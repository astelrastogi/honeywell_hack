// components/PerformanceMetrics.tsx
import React from 'react';

interface PerformanceProps {
  overallEfficiency: number;
  productionRate: number;
  qualityRate: number;
  downtime: number;
  trends: {
    daily: { timestamp: string; value: number }[];
    weekly: { timestamp: string; value: number }[];
    monthly: { timestamp: string; value: number }[];
  };
}

const PerformanceMetrics: React.FC<{ data: PerformanceProps }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
      <ul className="text-sm space-y-2">
        <li><strong>Overall Efficiency:</strong> {data.overallEfficiency}%</li>
        <li><strong>Production Rate:</strong> {data.productionRate} units/hr</li>
        <li><strong>Quality Rate:</strong> {data.qualityRate}%</li>
        <li><strong>Downtime:</strong> {data.downtime} hrs</li>
      </ul>
      {/* You can later plug in a chart here using Recharts or Chart.js */}
    </div>
  );
};

export default PerformanceMetrics;
