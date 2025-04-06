// types/index.ts

export interface Metric {
    name: string;
    value: string | number;
    unit?: string;
    status?: 'normal' | 'warning' | 'critical';
  }
  
  export interface Maintenance {
    description: string;
    date: string;
  }
  
  export interface Suggestion {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    impacts: {
      type: 'positive' | 'negative';
      description: string;
    }[];
  }
  
  export interface SimulationResult {
    summary: string;
    outcomes: {
      metric: string;
      before: string | number;
      after: string | number;
      change: number;
      unit: string;
      impact: 'positive' | 'negative' | 'neutral';
    }[];
    considerations: string[];
  }  
  
  export interface MachineData {
    id: string;
    name: string;
    status: {
      name: string;
      state: string;
      uptime: string;
      efficiency: number;
      operatorId: string;
      lastUpdate: string;
    };
    criticalMetrics: Metric[];
    nextMaintenance: {
      description: string;
      date: string;
    };
    sensors: Sensor[]; // ✅ fix here
    performance: {
      overallEfficiency: number;
      productionRate: number;
      qualityRate: number;
      downtime: number;
      trends: {
        daily: { timestamp: string; value: number }[];
        weekly: { timestamp: string; value: number }[];
        monthly: { timestamp: string; value: number }[];
      };
    };
    maintenanceHistory: {
      id: string;
      type: string;
      description: string;
      date: string;
      technician: string;
      duration: number;
    }[];
    shifts: ShiftData[];
  }

  export interface ShiftData {
    shiftId: string;
    name: string;
    startTime: string;
    endTime: string;
    operator: string;
    currentPart: string;
    statusRuntime: StatusRuntime[];
  }

  export interface StatusRuntime {
    status: string;
    time: number;
  }

  export interface Sensor {
    id: string;
    name: string;
    value: number;
    unit: string;
    status: 'normal' | 'warning' | 'critical';
    history: {
      timestamp: string;
      value: number;
    }[];
  }
  
  