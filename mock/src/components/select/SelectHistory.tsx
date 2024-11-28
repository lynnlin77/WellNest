import "../../styles/main.css";
import { histEntry } from "./Select";
import { DataTable } from '../table/DataTable';
import React from 'react';

/**
 * Props for the SelectHistory component.
 * 
 * @interface SelectHistoryProps
 * @property {Array<histEntry>} history - An array of historical entries, each containing data to be displayed.
 * @property {'table' | 'chart'} viewMode - The current view mode, determining whether to display the table or chart.
 * @property {(string | number)[][] | null} selectedDataset - The selected dataset to display in the table (if applicable).
 * @property {string} xAxis - The label for the x-axis in the chart.
 * @property {string} yAxis - The label for the y-axis in the chart.
 */
interface SelectHistoryProps {
  history: Array<histEntry>;
  viewMode: 'table' | 'chart';
  selectedDataset: (string | number)[][] | null;
  xAxis: string;
  yAxis: string;
}

/**
 * SelectHistory is a functional component that displays historical data in a table format.
 * 
 * @param {SelectHistoryProps} props - The props for the component, containing history, viewMode, and more.
 * @returns {JSX.Element | null} The rendered table component or null if conditions are not met.
 */
export const SelectHistory: React.FC<SelectHistoryProps> = ({ history, viewMode }) => {
  // If the view mode is not 'table' or the history is empty, return null (no rendering).
  if (viewMode !== 'table' || history.length === 0) {
    return null; 
  }

  // Get the latest entry from the history array.
  const latestEntry = history[history.length - 1];
  // Check if the latest entry has valid data.
  const datasetData = Array.isArray(latestEntry.data) ? latestEntry.data : null;

  // If no valid dataset is found, display a message indicating that no data is available.
  if (!datasetData) {
    return <div>No data available</div>;
  }

  // Render the component with a DataTable, passing the dataset to it.
  return (
    <div className="select-history">
      <DataTable dataset={datasetData} />
    </div>
  );
};
