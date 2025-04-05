import React, { useState } from 'react';
import MachineStatus from './MachineStatus';
import SensorReadings from './SensorReadings';
import PerformanceMetrics from './PerformanceMetrics';
import MaintenanceHistory from './MaintenanceHistory';
import ShiftStatusTable from './ShiftStatus';
import { MachineData } from '../types';

interface MachineDashboardProps {
//   data: MachineData;
    machines: MachineData[]; 
}

const MachineDashboard: React.FC<MachineDashboardProps> = ({ machines }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMachineId, setSelectedMachineId] = useState<string>(machines[0]?.id || '');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sensors', label: 'Sensor Readings' },
    { id: 'performance', label: 'Performance' },
    { id: 'maintenance', label: 'Maintenance History' }
  ];

  const selectedMachine = machines.find(machine => machine.id === selectedMachineId) || machines[0];

  const handleMachineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMachineId(event.target.value);
  };

  return (
    <div className="bg-grey rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Machine Dashboard</h2>
        <div className="flex items-center">
          <label htmlFor="machine-selector" className="mr-2 text-gray-600">Select Machine:</label>
          <select
            id="machine-selector"
            value={selectedMachineId}
            onChange={handleMachineChange}
            className="border rounded-md py-1 px-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {machines.map(machine => (
              <option key={machine.id} value={machine.id}>
                {machine.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MachineStatus data={selectedMachine.status} />
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Critical Metrics</h3>
                {selectedMachine.criticalMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2 last:mb-0"
                  >
                    <span className="text-gray-600">{metric.name}</span>
                    <span
                      className={`font-medium ${
                        metric.status === 'normal'
                          ? 'text-green-600'
                          : metric.status === 'warning'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {metric.value} {metric.unit}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">
                  Next Scheduled Maintenance
                </h3>
                <p className="text-gray-800">
                  {selectedMachine.nextMaintenance.description}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Scheduled:{' '}
                  {new Date(selectedMachine.nextMaintenance.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <ShiftStatusTable shift={selectedMachine.shifts[0]} />
          </div>
        )}

        {activeTab === 'sensors' && <SensorReadings data={selectedMachine.sensors} />}
        {activeTab === 'performance' && (
          <PerformanceMetrics data={selectedMachine.performance} />
        )}
        {activeTab === 'maintenance' && (
          <MaintenanceHistory data={selectedMachine.maintenanceHistory} />
        )}
      </div>
    </div>
  );
};

export default MachineDashboard;
