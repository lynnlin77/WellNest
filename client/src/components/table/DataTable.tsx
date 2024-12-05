import React from 'react';
import "../../styles/DataTable.css";

// Define the interface for DataTable's props
interface DataTableProps {
  dataset: (string | number)[][] | null;
}

/**
 * Define the DataTable component as a functional React component
 * @param param0 Destructured props object containing the dataset.
 * @returns The rendered table.
 */
export const DataTable: React.FC<DataTableProps> = ({ dataset }) => {
  if (!dataset) {
    return <div>No data available</div>;
  }

  // Assume first row of the dataset contains headers
  const headers = dataset[0];

  // All other rows contain data
  const rows = dataset.slice(1);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
