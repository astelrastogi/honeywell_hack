// components/MachineStatus.tsx
import React from 'react';

interface StatusProps {
  data: {
    name: string;
    state: string;
    uptime: string;
    efficiency: number;
    operatorId: string;
    lastUpdate: string;
  };
}

const MachineStatus: React.FC<{ data: StatusProps['data'] }> = ({ data }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Machine Status</h3>
      <ul className="text-sm space-y-2">
        <li><strong>Name:</strong> {data.name}</li>
        <li><strong>Status:</strong> <span className={data.state === 'operational' ? 'text-green-600' : 'text-red-600'}>{data.state}</span></li>
        <li><strong>Uptime:</strong> {data.uptime}</li>
        <li><strong>Efficiency:</strong> {data.efficiency}%</li>
        <li><strong>Operator ID:</strong> {data.operatorId}</li>
        <li><strong>Last Update:</strong> {new Date(data.lastUpdate).toLocaleString()}</li>
      </ul>
    </div>
  );
};

export default MachineStatus;
