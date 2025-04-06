'use client';

import React, { useState, useEffect } from 'react';
import MachineDashboard from '../components/MachineDashboard';
import SuggestionsPanel from '../components/SuggestionsPanel';
import SimulationModal from '../components/SimulationModal';
import { fetchMachineData, fetchSuggestions } from '../utils/api';
import { MachineData, Suggestion } from '../types';

export default function HomePage() {
  const [machineData, setMachineData] = useState<MachineData | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSimulation, setShowSimulation] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const data = await fetchMachineData();
  //       setMachineData(data);
  //       const suggestionsData = await fetchSuggestions(data);
  //       setSuggestions(suggestionsData);
  //     } catch (err) {
  //       console.error(err);
  //       setError('Failed to load data. Please try again.');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadData();

  //   const interval = setInterval(loadData, 30000);
  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMachineData();
        console.log('Fetched machine data:', data);
        setMachineData(data);
        const suggestionsData = await fetchSuggestions(data);
        console.log('Fetched suggestions:', suggestionsData);
        setSuggestions(suggestionsData);
      } catch (err) {
        console.error(err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulation = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setShowSimulation(true);
  };

  const handleFeedback = (suggestionId: string, feedbackType: string) => {
    console.log(`Feedback for suggestion ${suggestionId}: ${feedbackType}`);
    // Add API call if needed
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Machine Monitoring Dashboard</h1>
          <p className="text-gray-600">Real-time diagnostics and maintenance recommendations</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
          {machineData && <MachineDashboard data={machineData} />}
          </div>

          <div className="lg:col-span-1">
            <SuggestionsPanel 
              suggestions={suggestions}
              onSimulate={handleSimulation}
              onFeedback={handleFeedback}
            />
          </div>
        </div>
      </div>

      {showSimulation && selectedSuggestion && (
        <SimulationModal
          suggestion={selectedSuggestion}
          onClose={() => setShowSimulation(false)}
          machineData={machineData!}
        />
      )}
    </div>
  );
}
