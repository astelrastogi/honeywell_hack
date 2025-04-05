import { MachineData, Suggestion, SimulationResult } from '../types';

export const runSimulation = async (
  suggestion: Suggestion,
  machineData: MachineData
): Promise<SimulationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result: SimulationResult;

      switch (suggestion.id) {
        case 'sug-001':
          result = {
            summary: "Simulation shows that addressing hydraulic pressure...",
            outcomes: [
              { metric: "Unplanned Downtime Risk", before: 27, after: 8, unit: "%", change: -19, impact: "positive" },
              { metric: "Maintenance Cost", before: "Regular", after: "Regular", unit: "", change: 0, impact: "neutral" },
              { metric: "Machine Efficiency", before: 87, after: 89, unit: "%", change: 2, impact: "positive" },
              { metric: "Component Lifespan", before: "At risk", after: "Normal", unit: "", change: 0, impact: "positive" }
            ],
            considerations: [
              "Parts (relief valve, seals) should be on hand before inspection",
              "Schedule within 5 days for best risk mitigation"
            ]
          };
          break;

        case 'sug-002':
          result = {
            summary: "An oil change would improve efficiency...",
            outcomes: [
              { metric: "Energy Consumption", before: 57.3, after: 55.6, unit: "kW", change: -3, impact: "positive" },
              { metric: "Component Lifespan", before: "Normal", after: "Extended", unit: "", change: 15, impact: "positive" },
              { metric: "Production Efficiency", before: 87, after: 89, unit: "%", change: 2, impact: "positive" },
              { metric: "Maintenance Cost", before: "Regular", after: "Regular", unit: "", change: 0, impact: "neutral" }
            ],
            considerations: [
              "Use synthetic oil OL-274 for optimal performance",
              "Can be combined with other routine maintenance tasks"
            ]
          };
          break;

        default:
          result = {
            summary: "Addressing bearing wear would prevent failures...",
            outcomes: [
              { metric: "Future Downtime Risk", before: 18, after: 5, unit: "%", change: -13, impact: "positive" },
              { metric: "Maintenance Cost", before: "Unplanned", after: "Planned", unit: "", change: -40, impact: "positive" },
              { metric: "Bearing Lifespan", before: "At risk", after: "Extended", unit: "", change: 30, impact: "positive" },
              { metric: "Overall Reliability", before: 92, after: 96, unit: "%", change: 4, impact: "positive" }
            ],
            considerations: [
              "Include vibrational analysis during inspection",
              "Document findings for future improvements"
            ]
          };
      }

      resolve(result);
    }, 2000);
  });
};
