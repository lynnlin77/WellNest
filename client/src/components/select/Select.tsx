import React, { useState } from "react";
import "../../styles/main.css";
import { SelectInput } from "./SelectInput";
import { SelectHistory } from "./SelectHistory";

/**
 * A histEntry interface to structure each single output stored in the main output area
 */
export interface histEntry {
  data: (string | number)[][];
}

/**
 * Builds a Select component object that provides a dropdown to view current datasets available
 */
export function Select() {
  // State hooks for history, view mode, dataset, and axes.
  const [history, setHistory] = useState<histEntry[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [chartState, setChartState] = useState({
    selectedDataset: null as (string | number)[][] | null,
    xAxis: '',
    yAxis: '',
  });

  // Helper function to reset all state values
  const resetAllStates = () => {
    setHistory([]);
    setViewMode('table');
    setChartState({
      selectedDataset: null,
      xAxis: '',
      yAxis: '',
    });
  };

  // Handle user sign out
  const handleSignOut = () => {
    resetAllStates();
  };

  return (
    <div className="min-h-[95vh] relative">
      <div className="w-full" style={{ width: "100%" }}>
        {/* Sign Out Button */}
        <button onClick={handleSignOut}>Sign Out</button>

        {/* Table View: Only render the SelectHistory if view mode is 'table' */}
        {history.length > 0 && viewMode === 'table' && (
          <div className="select-container" aria-label="Select container">
            <pre>
              <SelectHistory history={history} viewMode="table" selectedDataset={null} xAxis={""} yAxis={""} />
            </pre>
          </div>
        )}

        {/* Separator line */}
        <hr />

        {/* Dataset and Axis Selection */}
        <SelectInput
          history={history}
          setHistory={setHistory}
          viewMode={viewMode}
          setViewMode={setViewMode}
          chartState={chartState}
          setChartState={setChartState}
        />
      </div>
    </div>
  );
}
