'use client';

import React, { useState, useEffect } from 'react';
import { runSimulation } from '../utils/simulation';
import { Suggestion, MachineData, SimulationResult } from '../types';

interface SimulationModalProps {
  suggestion: Suggestion;
  machineData: MachineData;
  onClose: () => void;
}

const SimulationModal: React.FC<SimulationModalProps> = ({ suggestion, onClose, machineData }) => {
  const [simulationResults, setSimulationResults] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const simulate = async () => {
      try {
        setIsLoading(true);
        const results = await runSimulation(suggestion, machineData);
        setSimulationResults(results);
      } catch (err) {
        console.error(err);
        setError('Failed to run simulation. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    simulate();
  }, [suggestion, machineData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">"What-If" Simulation: {suggestion.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : simulationResults ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Simulation Summary</h3>
                <p>{simulationResults.summary}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Predicted Outcomes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {simulationResults.outcomes.map((outcome, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800">{outcome.metric}</h4>
                      <div className="flex items-center mt-2">
                        <div className="mr-2 font-bold">
                          {outcome.before} → {outcome.after} {outcome.unit}
                        </div>
                        <span
                          className={`text-sm ${
                            outcome.impact === 'positive'
                              ? 'text-green-600'
                              : outcome.impact === 'negative'
                              ? 'text-red-600'
                              : 'text-gray-600'
                          }`}
                        >
                          ({outcome.change > 0 ? '+' : ''}
                          {outcome.change}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Implementation Considerations</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {simulationResults.considerations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 mr-2"
          >
            Close
          </button>
          {!isLoading && !error && simulationResults && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => {
                alert('Implementation plan would be generated here');
                onClose();
              }}
            >
              Generate Implementation Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationModal;
