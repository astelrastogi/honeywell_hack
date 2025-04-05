import React from 'react';
import { ShiftData } from '../types';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Props {
  shift: ShiftData;
}

const COLORS = ['#34D399', '#FBBF24', '#F87171']; // Running, Idle, Maintenance

const ShiftStatusTable: React.FC<Props> = ({ shift }) => {
  const pieData = shift.statusRuntime.map(status => ({
    name: status.status,
    value: status.time
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Current Shift Summary</h3>

      <table className="min-w-full mb-6">
        <thead>
          <tr>
            <th className="text-left p-2">Part Name</th>
            <th className="text-left p-2">Shift</th>
            <th className="text-left p-2">Operator</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2 font-medium">{shift.currentPart}</td>
            <td className="p-2">{shift.name}</td>
            <td className="p-2">{shift.operator}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-center">
        <PieChart width={300} height={250}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default ShiftStatusTable;
