'use client';

import React from 'react';
import { Suggestion } from '../types';

interface SuggestionsPanelProps {
  suggestions: Suggestion[];
  onSimulate: (suggestion: Suggestion) => void;
  onFeedback: (id: string, feedbackType: 'helpful' | 'not-helpful') => void;
}

const SuggestionsPanel: React.FC<SuggestionsPanelProps> = ({ suggestions, onSimulate, onFeedback }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Smart Suggestions</h2>
        <p className="text-gray-600">No suggestions available at the moment.</p>
      </div>
    );
  }

  const getSeverityColor = (priority: Suggestion['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-800';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-500 text-green-800';
      default: return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Smart Suggestions</h2>
      
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`border-l-4 p-4 rounded-r-lg ${getSeverityColor(suggestion.priority)}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{suggestion.title}</h3>
              <span className="text-xs uppercase font-bold px-2 py-1 rounded bg-white bg-opacity-50">
                {suggestion.priority}
              </span>
            </div>

            <p className="text-sm mb-3">{suggestion.description}</p>

            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Predicted Impact:</h4>
              <ul className="text-sm space-y-1">
                {suggestion.impacts.map((impact, index) => (
                  <li key={index} className="flex items-center">
                    {impact.type === 'positive' ? (
                      <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-red-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    {impact.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => onSimulate(suggestion)}
                className="text-sm bg-white hover:bg-gray-100 text-gray-800 font-medium py-1 px-3 border border-gray-300 rounded shadow-sm"
              >
                Run "What-If" Simulation
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => onFeedback(suggestion.id, 'helpful')}
                  className="text-green-600 hover:text-green-800"
                  title="Mark as helpful"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </button>
                <button
                  onClick={() => onFeedback(suggestion.id, 'not-helpful')}
                  className="text-red-600 hover:text-red-800"
                  title="Mark as not helpful"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsPanel;
