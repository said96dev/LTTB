import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ChartControlsProps {
  dataSize: number;
  threshold: number;
  onDataSizeChange: (size: number) => void;
  onThresholdChange: (threshold: number) => void;
}

export function ChartControls({
  dataSize,
  threshold,
  onDataSizeChange,
  onThresholdChange,
}: ChartControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="space-y-2">
        <Label htmlFor="dataPoints">Data Points</Label>
        <Input
          id="dataPoints"
          type="number"
          min="100"
          max="10000"
          value={dataSize}
          onChange={(e) => onDataSizeChange(Math.max(100, Math.min(10000, parseInt(e.target.value) || 100)))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="threshold">LTTB Threshold</Label>
        <Input
          id="threshold"
          type="number"
          min="10"
          max={dataSize}
          value={threshold}
          onChange={(e) => onThresholdChange(Math.max(10, Math.min(dataSize, parseInt(e.target.value) || 10)))}
        />
      </div>
    </div>
  );
}