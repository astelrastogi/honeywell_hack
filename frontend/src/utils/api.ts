import { MachineData, Suggestion, Metric, SimulationResult } from '../types';

export const fetchMachineData = async (): Promise<MachineData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "machine-001",
            name: "Production Line A",
            status: {
              name: "Production Line A",
              state: "operational",
              uptime: "14d 6h 23m",
              efficiency: 87,
              operatorId: "OP-4872",
              lastUpdate: new Date().toISOString()
            },
            criticalMetrics: [
              { name: "Temperature", value: 72.4, unit: "°C", status: "normal" },
              { name: "Pressure", value: 143.2, unit: "PSI", status: "warning" },
              { name: "Vibration", value: 0.32, unit: "mm/s", status: "normal" },
              { name: "Power Usage", value: 57.3, unit: "kW", status: "normal" }
            ],
            nextMaintenance: {
              description: "Scheduled lubrication and bearing inspection",
              date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            sensors: [
              { id: "sensor-001", name: "Main Motor Temperature", value: 72.4, unit: "°C", status: "normal", history: generateHistoricalData(65, 80) },
              { id: "sensor-002", name: "Hydraulic Pressure", value: 143.2, unit: "PSI", status: "warning", history: generateHistoricalData(120, 150) },
              { id: "sensor-003", name: "Main Shaft Vibration", value: 0.32, unit: "mm/s", status: "normal", history: generateHistoricalData(0.1, 0.5) },
              { id: "sensor-004", name: "Power Consumption", value: 57.3, unit: "kW", status: "normal", history: generateHistoricalData(45, 65) },
              { id: "sensor-005", name: "Oil Quality", value: 87, unit: "%", status: "normal", history: generateHistoricalData(80, 100) },
              { id: "sensor-006", name: "Coolant Level", value: 76, unit: "%", status: "normal", history: generateHistoricalData(70, 100) }
            ],
            performance: {
              overallEfficiency: 87,
              productionRate: 142,
              qualityRate: 98.3,
              downtime: 3.2,
              trends: {
                daily: generateHistoricalData(80, 95, 30),
                weekly: generateHistoricalData(75, 90, 12),
                monthly: generateHistoricalData(70, 95, 6)
              }
            },
            maintenanceHistory: [
              { id: "maint-001", type: "Preventive", description: "Quarterly inspection and lubrication", date: "2024-12-15T09:30:00Z", technician: "J. Smith", duration: 120 },
              { id: "maint-002", type: "Corrective", description: "Bearing replacement on secondary motor", date: "2024-11-28T14:15:00Z", technician: "A. Johnson", duration: 240 },
              { id: "maint-003", type: "Preventive", description: "Filter replacement and fluid check", date: "2024-11-02T10:00:00Z", technician: "M. Garcia", duration: 90 }
            ],
            shifts: [
                {
                  shiftId: "shift-001",
                  name: "Morning",
                  startTime: "2025-04-05T06:00:00",
                  endTime: "2025-04-05T14:00:00",
                  operator: "OP-4872",
                  currentPart: "AXL-349",
                  statusRuntime: [
                    { status: "Running", time: 2036 },
                    { status: "Idle", time: 254 },
                    { status: "Maintenance", time: 222 }
                  ]
                },
                {
                  shiftId: "shift-002",
                  name: "Afternoon",
                  startTime: "2025-04-05T14:00:00",
                  endTime: "2025-04-05T22:00:00",
                  operator: "OP-5231",
                  currentPart: "BRC-114",
                  statusRuntime: [
                    { status: "Running", time: 2626 },
                    { status: "Idle", time: 516 },
                    { status: "Maintenance", time: 254 }
                  ]
                },
                {
                  shiftId: "shift-003",
                  name: "Night",
                  startTime: "2025-04-05T22:00:00",
                  endTime: "2025-04-06T06:00:00",
                  operator: "OP-3615",
                  currentPart: "CTL-221",
                  statusRuntime: [
                    { status: "Running", time: 2238 },
                    { status: "Idle", time: 306 },
                    { status: "Maintenance", time: 291 }
                  ]
                }
            ]
          },
          {
            id: "machine-002",
            name: "Assembly Line B",
            status: {
              name: "Assembly Line B",
              state: "warning",
              uptime: "7d 12h 45m",
              efficiency: 73,
              operatorId: "OP-5231",
              lastUpdate: new Date().toISOString()
            },
            criticalMetrics: [
              { name: "Temperature", value: 85.1, unit: "°C", status: "warning" },
              { name: "Pressure", value: 128.7, unit: "PSI", status: "normal" },
              { name: "Vibration", value: 0.48, unit: "mm/s", status: "warning" },
              { name: "Power Usage", value: 62.8, unit: "kW", status: "normal" }
            ],
            nextMaintenance: {
              description: "Full system inspection and component replacement",
              date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            sensors: [
              { id: "sensor-101", name: "Main Motor Temperature", value: 85.1, unit: "°C", status: "warning", history: generateHistoricalData(70, 90) },
              { id: "sensor-102", name: "Hydraulic Pressure", value: 128.7, unit: "PSI", status: "normal", history: generateHistoricalData(115, 140) },
              { id: "sensor-103", name: "Main Shaft Vibration", value: 0.48, unit: "mm/s", status: "warning", history: generateHistoricalData(0.2, 0.6) },
              { id: "sensor-104", name: "Power Consumption", value: 62.8, unit: "kW", status: "normal", history: generateHistoricalData(50, 70) },
              { id: "sensor-105", name: "Oil Quality", value: 72, unit: "%", status: "warning", history: generateHistoricalData(65, 95) },
              { id: "sensor-106", name: "Coolant Level", value: 63, unit: "%", status: "warning", history: generateHistoricalData(60, 100) }
            ],
            performance: {
              overallEfficiency: 73,
              productionRate: 118,
              qualityRate: 96.2,
              downtime: 8.7,
              trends: {
                daily: generateHistoricalData(65, 85, 30),
                weekly: generateHistoricalData(60, 80, 12),
                monthly: generateHistoricalData(55, 85, 6)
              }
            },
            maintenanceHistory: [
              { id: "maint-101", type: "Corrective", description: "Emergency repair on conveyor system", date: "2025-01-05T08:45:00Z", technician: "R. Davis", duration: 180 },
              { id: "maint-102", type: "Preventive", description: "Monthly inspection and calibration", date: "2024-12-10T13:30:00Z", technician: "S. Wilson", duration: 150 },
              { id: "maint-103", type: "Corrective", description: "Sensor replacement and recalibration", date: "2024-11-22T09:15:00Z", technician: "L. Martinez", duration: 120 }
            ],shifts: [
                {
                  shiftId: "shift-001",
                  name: "Morning",
                  startTime: "2025-04-05T06:00:00",
                  endTime: "2025-04-05T14:00:00",
                  operator: "OP-4872",
                  currentPart: "AXL-349",
                  statusRuntime: [
                    { status: "Running", time: 2036 },
                    { status: "Idle", time: 254 },
                    { status: "Maintenance", time: 222 }
                  ]
                },
                {
                  shiftId: "shift-002",
                  name: "Afternoon",
                  startTime: "2025-04-05T14:00:00",
                  endTime: "2025-04-05T22:00:00",
                  operator: "OP-5231",
                  currentPart: "BRC-114",
                  statusRuntime: [
                    { status: "Running", time: 2626 },
                    { status: "Idle", time: 516 },
                    { status: "Maintenance", time: 254 }
                  ]
                },
                {
                  shiftId: "shift-003",
                  name: "Night",
                  startTime: "2025-04-05T22:00:00",
                  endTime: "2025-04-06T06:00:00",
                  operator: "OP-3615",
                  currentPart: "CTL-221",
                  statusRuntime: [
                    { status: "Running", time: 2238 },
                    { status: "Idle", time: 306 },
                    { status: "Maintenance", time: 291 }
                  ]
                }
            ]
          },
          {
            id: "machine-003",
            name: "Packaging Line C",
            status: {
              name: "Packaging Line C",
              state: "critical",
              uptime: "2d 8h 15m",
              efficiency: 58,
              operatorId: "OP-3615",
              lastUpdate: new Date().toISOString()
            },
            criticalMetrics: [
              { name: "Temperature", value: 92.7, unit: "°C", status: "critical" },
              { name: "Pressure", value: 163.5, unit: "PSI", status: "critical" },
              { name: "Vibration", value: 0.67, unit: "mm/s", status: "warning" },
              { name: "Power Usage", value: 68.9, unit: "kW", status: "warning" }
            ],
            nextMaintenance: {
              description: "Critical maintenance - full system overhaul",
              date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            sensors: [
              { id: "sensor-201", name: "Main Motor Temperature", value: 92.7, unit: "°C", status: "critical", history: generateHistoricalData(75, 95) },
              { id: "sensor-202", name: "Hydraulic Pressure", value: 163.5, unit: "PSI", status: "critical", history: generateHistoricalData(130, 170) },
              { id: "sensor-203", name: "Main Shaft Vibration", value: 0.67, unit: "mm/s", status: "warning", history: generateHistoricalData(0.3, 0.7) },
              { id: "sensor-204", name: "Power Consumption", value: 68.9, unit: "kW", status: "warning", history: generateHistoricalData(55, 75) },
              { id: "sensor-205", name: "Oil Quality", value: 58, unit: "%", status: "critical", history: generateHistoricalData(50, 90) },
              { id: "sensor-206", name: "Coolant Level", value: 42, unit: "%", status: "critical", history: generateHistoricalData(40, 100) }
            ],
            performance: {
              overallEfficiency: 58,
              productionRate: 97,
              qualityRate: 91.8,
              downtime: 16.3,
              trends: {
                daily: generateHistoricalData(50, 70, 30),
                weekly: generateHistoricalData(45, 75, 12),
                monthly: generateHistoricalData(40, 80, 6)
              }
            },
            maintenanceHistory: [
              { id: "maint-201", type: "Corrective", description: "Emergency shutdown and repair", date: "2025-01-10T16:20:00Z", technician: "T. Brown", duration: 360 },
              { id: "maint-202", type: "Preventive", description: "Regular inspection and minor repairs", date: "2024-12-20T10:45:00Z", technician: "C. Lee", duration: 180 },
              { id: "maint-203", type: "Corrective", description: "Motor replacement and system realignment", date: "2024-12-05T14:30:00Z", technician: "J. Smith", duration: 420 }
            ],shifts: [
                {
                  shiftId: "shift-001",
                  name: "Morning",
                  startTime: "2025-04-05T06:00:00",
                  endTime: "2025-04-05T14:00:00",
                  operator: "OP-4872",
                  currentPart: "AXL-349",
                  statusRuntime: [
                    { status: "Running", time: 2036 },
                    { status: "Idle", time: 254 },
                    { status: "Maintenance", time: 222 }
                  ]
                },
                {
                  shiftId: "shift-002",
                  name: "Afternoon",
                  startTime: "2025-04-05T14:00:00",
                  endTime: "2025-04-05T22:00:00",
                  operator: "OP-5231",
                  currentPart: "BRC-114",
                  statusRuntime: [
                    { status: "Running", time: 2626 },
                    { status: "Idle", time: 516 },
                    { status: "Maintenance", time: 254 }
                  ]
                },
                {
                  shiftId: "shift-003",
                  name: "Night",
                  startTime: "2025-04-05T22:00:00",
                  endTime: "2025-04-06T06:00:00",
                  operator: "OP-3615",
                  currentPart: "CTL-221",
                  statusRuntime: [
                    { status: "Running", time: 2238 },
                    { status: "Idle", time: 306 },
                    { status: "Maintenance", time: 291 }
                  ]
                }
            ]
          }
        ]);
      }, 1000);
    });
  };

export const fetchSuggestions = async (machineData: MachineData): Promise<Suggestion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suggestions: Suggestion[] = [];

      if (machineData.criticalMetrics.some(m => m.name === "Pressure" && m.status === "warning")) {
        suggestions.push({
          id: "sug-001",
          title: "Hydraulic System Pressure Alert",
          description: "Hydraulic pressure is trending outside optimal range...",
          priority: "high",
          impacts: [
            { type: "positive", description: "Prevent unexpected downtime (est. 4-8 hours)" },
            { type: "positive", description: "Avoid potential damage to pump components" },
            { type: "positive", description: "Maintain optimal production efficiency" }
          ]
        });
      }

      if (machineData.sensors.some(s => s.name === "Oil Quality" && s.value < 90)) {
        suggestions.push({
          id: "sug-002",
          title: "Schedule Oil Change",
          description: "Oil quality has degraded to 87%. Recommend scheduling oil change...",
          priority: "medium",
          impacts: [
            { type: "positive", description: "Extend component lifespan by up to 15%" },
            { type: "positive", description: "Improve energy efficiency by 2-3%" },
            { type: "negative", description: "Requires 2 hour maintenance window" }
          ]
        });
      }

      suggestions.push({
        id: "sug-003",
        title: "Bearing Wear Detected",
        description: "Early signs of wear detected on main drive bearings...",
        priority: "low",
        impacts: [
          { type: "positive", description: "Extend bearing life by addressing early" },
          { type: "positive", description: "Optimize maintenance scheduling" },
          { type: "positive", description: "Prevent unexpected failures" }
        ]
      });

      resolve(suggestions);
    }, 1500);
  });
};

function generateHistoricalData(min: number, max: number, points: number = 24, includeFuture: boolean = true) {
    const data = [];
    const totalPoints = includeFuture ? points + 6 : points; // Add 6 future points
  
    for (let i = 0; i < totalPoints; i++) {
      const offset = i - (points - 1);
      const timestamp = new Date(Date.now() + offset * 3600000).toISOString(); // hourly intervals
      data.push({
        timestamp,
        value: Math.round((Math.random() * (max - min) + min) * 10) / 10,
      });
    }
  
    return data;
  }
  
