'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// const data = [
//   { name: 'Running', value: 2036 },
//   { name: 'Idle', value: 254 },
//   { name: 'Maintenance', value: 222 },
// ];
function generateRandomData() {
    const total = 2500 + Math.floor(Math.random() * 300); // total cycles
    const running = Math.floor(total * 0.75 + Math.random() * 100); // ~75-85%
    const idle = Math.floor((total - running) * 0.6); // ~60% of remaining
    const maintenance = total - running - idle;
  
    return [
      { name: 'Running', value: running },
      { name: 'Idle', value: idle },
      { name: 'Maintenance', value: maintenance },
    ];
  }

const COLORS = ['#00C49F', '#FFBB28', '#FF4F4F'];

export default function CurrentShiftSummary() {
    const [operator, setOperator] = useState('Loading...');
    const [data, setData] = useState(generateRandomData());
  
    useEffect(() => {
      fetch('http://localhost:5002/api/machine-data')
        .then((res) => res.json())
        .then((data) => {
          const op = data?.status?.operatorId ?? 'Unknown';
          setOperator(op);
        })
        .catch((err) => {
          console.error('Failed to fetch operator:', err);
          setOperator('Unavailable');
        });
  
      setData(generateRandomData());
    }, []);
  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4">Current Shift Summary</h3>
      <table className="mb-4 text-sm w-full">
        <thead>
          <tr className="text-left">
            <th className="pr-4">Part Name</th>
            <th className="pr-4">Shift</th>
            <th className="pr-4">Operator</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AXL-349</td>
            <td>Morning</td>
            <td>{operator}</td>
          </tr>
        </tbody>
      </table>
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          cx={150}
          cy={100}
          innerRadius={50}
          outerRadius={70}
          paddingAngle={2}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
