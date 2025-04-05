import React, { useState } from 'react';
import MachineStatus from './MachineStatus';
import SensorReadings from './SensorReadings';
import PerformanceMetrics from './PerformanceMetrics';
import MaintenanceHistory from './MaintenanceHistory';
import { MachineData } from '../types';

interface MachineDashboardProps {
  data: MachineData;
}

const MachineDashboard: React.FC<MachineDashboardProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sensors', label: 'Sensor Readings' },
    { id: 'performance', label: 'Performance' },
    { id: 'maintenance', label: 'Maintenance History' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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
            <MachineStatus data={data.status} />
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Critical Metrics</h3>
                {data.criticalMetrics.map((metric, index) => (
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
                  {data.nextMaintenance.description}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Scheduled:{' '}
                  {new Date(data.nextMaintenance.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sensors' && <SensorReadings data={data.sensors} />}
        {activeTab === 'performance' && (
          <PerformanceMetrics data={data.performance} />
        )}
        {activeTab === 'maintenance' && (
          <MaintenanceHistory data={data.maintenanceHistory} />
        )}
      </div>
    </div>
  );
};

export default MachineDashboard;
