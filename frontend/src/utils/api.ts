import { MachineData, Suggestion, Metric, SimulationResult } from '../types';

export const fetchMachineData = async (): Promise<MachineData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
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
        ]
      });
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

function generateHistoricalData(min: number, max: number, points: number = 24) {
  const data = [];
  for (let i = 0; i < points; i++) {
    data.push({
      timestamp: new Date(Date.now() - (points - i) * 3600000).toISOString(),
      value: Math.round((Math.random() * (max - min) + min) * 10) / 10
    });
  }
  return data;
}
