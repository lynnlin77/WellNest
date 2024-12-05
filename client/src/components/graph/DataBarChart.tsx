import React from 'react';
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";

/**
 * Props for the DataBarChart component.
 * 
 * @interface DataBarChartProps
 * @property {string[]} labels - The labels for the x-axis of the bar chart.
 * @property {number[]} data - The data values corresponding to each label.
 */
interface DataBarChartProps {
  labels: string[];
  data: number[];
}

/**
 * DataBarChart is a functional component that renders a bar chart using Chart.js and React.
 * 
 * @param {DataBarChartProps} props - The props for the component, containing labels and data.
 * @returns {JSX.Element} The rendered bar chart component.
 */
export const DataBarChart: React.FC<DataBarChartProps> = ({ labels, data }) => {
  // Prepare the data structure for the bar chart.
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Data Set', // Label for the dataset.
        data: data, // Data values for the bar chart.
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color of the bars in the chart.
      },
    ],
  };

  // Render the Bar component from react-chartjs-2 with the prepared chart data.
  return <Bar data={chartData} />;
};
