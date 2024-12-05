import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import "../../styles/main.css";
import { histEntry } from "./Select";
import { housing, cityIncome, retailSales, employeeSalary, inventoryProduct, studentGrade } from '../../data/mockedData';
import { DataBarChart } from "../graph/DataBarChart";

/**
 * Props for the SelectInput component.
 * 
 * @interface SelectInputProps
 * @property {Array<histEntry>} history - An array of historical entries to track selected datasets.
 * @property {Dispatch<SetStateAction<Array<histEntry>>} setHistory - Function to update the history state.
 * @property {'table' | 'chart'} viewMode - The current view mode, determining whether to display the table or chart.
 * @property {Dispatch<SetStateAction<'table' | 'chart'>>} setViewMode - Function to update the view mode state.
 * @property {Object} chartState - Object containing the selected dataset and axis labels.
 * @property {(string | number)[][] | null} chartState.selectedDataset - The currently selected dataset for the chart.
 * @property {string} chartState.xAxis - The label for the x-axis in the chart.
 * @property {string} chartState.yAxis - The label for the y-axis in the chart.
 * @property {Dispatch<SetStateAction<Object>>} setChartState - Function to update the chart state.
 */
interface SelectInputProps {
  history: Array<histEntry>;
  setHistory: Dispatch<SetStateAction<Array<histEntry>>>;
  viewMode: 'table' | 'chart';
  setViewMode: Dispatch<SetStateAction<'table' | 'chart'>>;
  chartState: {
    selectedDataset: (string | number)[][] | null;
    xAxis: string;
    yAxis: string;
  };
  setChartState: Dispatch<SetStateAction<{
    selectedDataset: (string | number)[][] | null;
    xAxis: string;
    yAxis: string;
  }>>;
}

// Type representing a dataset
type Dataset = (string | number)[][];

// Mapping of dataset names to their respective data
const datasets: Record<string, Dataset> = {
  housing,
  cityIncome,
  retailSales,
  employeeSalary,
  inventoryProduct,
  studentGrade,
};

/**
 * SelectInput is a functional component that allows users to select datasets and view data in different formats (chart/table).
 * 
 * @param {SelectInputProps} props - The props for the component, containing history, viewMode, and more.
 * @returns {JSX.Element} The rendered component for selecting datasets and viewing data.
 */
export function SelectInput({
  history, setHistory, viewMode, setViewMode, chartState, setChartState,
}: SelectInputProps) {
  const { selectedDataset, xAxis, yAxis } = chartState;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handles changes in the dataset selection dropdown
  const handleDatasetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const datasetName = e.target.value;
    const dataset = datasets[datasetName];

    setChartState({
      selectedDataset: dataset,
      xAxis: '',
      yAxis: '',
    });

    // Reset chart labels, data, and error messages
    setChartLabels([]);
    setChartData([]);
    setErrorMessage(null);
    setIsSubmitted(false); 
  };

  // Function to validate the selected chart data
  const isChartDataValid = (): boolean => {
    if (selectedDataset && xAxis && yAxis) {
      const headers = selectedDataset[0];
      const xAxisIndex = headers.indexOf(xAxis);
      const yAxisIndex = headers.indexOf(yAxis);

      // Check for valid axis selections
      if (xAxisIndex === -1 || yAxisIndex === -1) {
        setErrorMessage("Invalid axis selection.");
        return false;
      }

      const yAxisData = selectedDataset.slice(1).map(row => row[yAxisIndex]);
      const isYAxisValid = yAxisData.every(value => typeof value === 'number');

      // Ensure the Y axis data is numerical
      if (!isYAxisValid) {
        setErrorMessage("The selected Y Axis must contain numerical data.");
        return false;
      }

      setErrorMessage(null);
      return true;
    }

    setErrorMessage("Please select a dataset and valid X and Y axes.");
    return false;
  };

  // Updates the chart data based on the selected axes
  const updateChartData = () => {
    if (isChartDataValid()) {
      const headers = selectedDataset![0];
      const xAxisIndex = headers.indexOf(xAxis);
      const yAxisIndex = headers.indexOf(yAxis);

      // Extract labels and data for the chart
      setChartLabels(selectedDataset!.slice(1).map(row => row[xAxisIndex].toString()));
      setChartData(selectedDataset!.slice(1).map(row => Number(row[yAxisIndex])));
    } else {
      setChartLabels([]);
      setChartData([]);
    }
  };

  // Effect to update chart data when the axis or dataset changes
  useEffect(() => {
    if (selectedDataset && xAxis && yAxis) {
      updateChartData();
    }
  }, [xAxis, yAxis, selectedDataset]);

  // Get available options for X and Y axes based on the selected dataset
  const axisOptions = selectedDataset ? selectedDataset[0] : [];

  return (
    <div className="dropdown-container">
      {/* Dataset selection dropdown */}
      <select
        className="dropdown"
        name="dropdown"
        id="dropdown"
        aria-label="dropdown"
        onChange={handleDatasetChange}
        value={selectedDataset ? Object.keys(datasets).find(key => datasets[key] === selectedDataset) : ''}
      >
        <option value="">Select a dataset</option>
        {Object.keys(datasets).map((datasetName) => (
          <option key={datasetName} value={datasetName}>
            {datasetName}
          </option>
        ))}
      </select>

      {/* Submit Button */}
      <button
        onClick={() => {
          if (selectedDataset) {
            const newHistEntry: histEntry = { data: selectedDataset };
            setHistory([...history, newHistEntry]);
            setIsSubmitted(true);
          } else {
            console.error("No dataset selected");
          }
        }}
      >
        Submit
      </button>

      {/* View mode buttons */}
      {isSubmitted && (
        <div>
          <button onClick={() => setViewMode('chart')}>Chart View</button>
          <button onClick={() => setViewMode('table')}>Table View</button>
        </div>
      )}

      {/* Axis selection dropdowns */}
      {viewMode === 'chart' && isSubmitted && selectedDataset && axisOptions.length > 0 && (
        <div className="axis-dropdowns">
          <label htmlFor="xAxisSelect">Select X Axis:</label>
          <select
            id="xAxisSelect"
            value={xAxis}
            onChange={(e) => setChartState(prev => ({ ...prev, xAxis: e.target.value }))}
          >
            <option value="">Select X Axis</option>
            {axisOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label htmlFor="yAxisSelect">Select Y Axis:</label>
          <select
            id="yAxisSelect"
            value={yAxis}
            onChange={(e) => setChartState(prev => ({ ...prev, yAxis: e.target.value }))}
          >
            <option value="">Select Y Axis</option>
            {axisOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Error message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Chart rendering */}
      {viewMode === 'chart' &&
        !errorMessage &&
        isSubmitted &&
        xAxis !== '' &&
        yAxis !== '' &&
        chartLabels.length > 0 &&
        chartData.length > 0 && (
          <div className="chart-container">
            <DataBarChart labels={chartLabels} data={chartData} />
          </div>
        )}
    </div>
  );
}
