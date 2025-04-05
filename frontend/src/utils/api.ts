import { MachineData, Suggestion } from '../types';

export const fetchMachineData = async (): Promise<MachineData> => {
  try {
    const response = await fetch('http://localhost:5002/api/machine-data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MachineData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching machine data:', error);
    throw error;
  }
};

export const fetchSuggestions = async (machineData: MachineData): Promise<Suggestion[]> => {
  try {
    const response = await fetch('http://localhost:5002/api/suggestions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const suggestions: Suggestion[] = await response.json();
    return suggestions;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};