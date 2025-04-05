'use client';

import React, { useState, useEffect } from 'react';
import MachineDashboard from '../components/MachineDashboard';
import SuggestionsPanel from '../components/SuggestionsPanel';
import SimulationModal from '../components/SimulationModal';
import { fetchMachineData, fetchSuggestions } from '../utils/api';
import { MachineData, Suggestion } from '../types';

export default function HomePage() {
  const [machines, setMachines] = useState<MachineData[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSimulation, setShowSimulation] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [selectedMachineId, setSelectedMachineId] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const machinesData = await fetchMachineData();
        setMachines(machinesData);
        
        if (machinesData.length > 0) {
          // Set the first machine as selected by default if no selection exists
          if (!selectedMachineId) {
            setSelectedMachineId(machinesData[0].id);
          }
          
          // Get suggestions for all machines or the selected machine
          const selectedMachine = machinesData.find(m => m.id === selectedMachineId) || machinesData[0];
          const suggestionsData = await fetchSuggestions(selectedMachine);
          setSuggestions(suggestionsData);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [selectedMachineId]);

  const handleSimulation = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setShowSimulation(true);
  };

  const handleFeedback = (suggestionId: string, feedbackType: string) => {
    console.log(`Feedback for suggestion ${suggestionId}: ${feedbackType}`);
    // Add API call if needed
  };

  // Handler for machine selection (if you want to sync it with the dropdown in MachineDashboard)
  const handleMachineChange = (machineId: string) => {
    setSelectedMachineId(machineId);
  };

  if (isLoading && machines.length === 0) {
    return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
  }

  const selectedMachine = machines.find(m => m.id === selectedMachineId) || (machines.length > 0 ? machines[0] : null);

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Machine Monitoring Dashboard</h1>
          <p className="text-gray-600">Real-time diagnostics and maintenance recommendations</p>
        </header> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {machines.length > 0 && (
              <MachineDashboard machines={machines} />
            )}
          </div>

          <div className="lg:col-span-1">
            <SuggestionsPanel
              suggestions={suggestions}
              onSimulate={handleSimulation}
              onFeedback={handleFeedback}
              // machineName={selectedMachine?.name || ''}
            />
          </div>
        </div>
      </div>

      {showSimulation && selectedSuggestion && selectedMachine && (
        <SimulationModal
          suggestion={selectedSuggestion}
          onClose={() => setShowSimulation(false)}
          machineData={selectedMachine}
        />
      )}
    </div>
  );
}