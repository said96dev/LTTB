import React from 'react';
import { DataPoint } from '../lttb';

interface DataComparisonProps {
  originalData: DataPoint[];
  sampledData: DataPoint[];
}

export function DataComparison({ originalData, sampledData }: DataComparisonProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Data Comparison</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">Dataset</th>
              <th className="px-4 py-2 text-left">Points</th>
              <th className="px-4 py-2 text-left">Memory</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Original Data</td>
              <td className="px-4 py-2">{originalData.length}</td>
              <td className="px-4 py-2">{(originalData.length * 16 / 1024).toFixed(2)} KB</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">LTTB Sampled</td>
              <td className="px-4 py-2">{sampledData.length}</td>
              <td className="px-4 py-2">{(sampledData.length * 16 / 1024).toFixed(2)} KB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}