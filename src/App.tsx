import React, { useState, useMemo } from 'react'
import { LineChart, Download, RotateCcw, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChartControls } from './components/chart-controls'
import { DataComparison } from './components/data-comparison'
import { ChartVisualization } from './components/chart-visualization'
import { Navbar } from './components/navbar'
import { Documentation } from './components/documentation'
import { lttb, DataPoint } from './lttb'

const generateData = (
  size: number
): { voltage: DataPoint[]; current: DataPoint[] } => {
  const voltage: DataPoint[] = []
  const current: DataPoint[] = []
  for (let i = 0; i < size; i++) {
    const x = i
    // Generate voltage data (sine wave with noise)
    const baseVoltage = 220 + 20 * Math.sin(2 * Math.PI * (i / size))
    const voltageNoise = Math.random() * 4 - 2
    const y = baseVoltage + voltageNoise
    voltage.push({ x, y })

    // Generate current data (different pattern)
    const baseCurrent = 10 + 3 * Math.cos(4 * Math.PI * (i / size))
    const currentNoise = Math.random() * 0.5 - 0.25
    const currentY = baseCurrent + currentNoise
    current.push({ x, y: currentY })
  }
  return { voltage, current }
}

function App() {
  const [dataSize, setDataSize] = useState(1440)
  const [threshold, setThreshold] = useState(100)
  const [zoomRange, setZoomRange] = useState<{
    start: number
    end: number
  } | null>(null)
  const [showDocs, setShowDocs] = useState(false)

  const originalData = useMemo(() => generateData(dataSize), [dataSize])

  const sampledData = useMemo(() => {
    if (zoomRange) {
      const zoomedVoltage = originalData.voltage.filter(
        (point) => point.x >= zoomRange.start && point.x <= zoomRange.end
      )
      const zoomedCurrent = originalData.current.filter(
        (point) => point.x >= zoomRange.start && point.x <= zoomRange.end
      )
      return {
        voltage: lttb(zoomedVoltage, threshold),
        current: lttb(zoomedCurrent, threshold),
      }
    }
    return {
      voltage: lttb(originalData.voltage, threshold),
      current: lttb(originalData.current, threshold),
    }
  }, [originalData, threshold, zoomRange])

  const downloadAnalysis = () => {
    const content = `
LTTB Algorithm Analysis

Original Data Points: ${originalData.voltage.length}
Sampled Data Points: ${sampledData.voltage.length}
Compression Ratio: ${(
      (sampledData.voltage.length / originalData.voltage.length) *
      100
    ).toFixed(1)}%

Current View:
${
  zoomRange
    ? `Showing data points from ${zoomRange.start} to ${zoomRange.end}`
    : 'Showing all data points'
}

Algorithm Steps:
1. Start with the first point, which is always included in the result.
2. Divide the remaining points into ${
      sampledData.voltage.length - 2
    } buckets based on the desired downsample threshold.
3. For each bucket:
   - Calculate the average point (the mean of x and y values) of all the points in the bucket.
   - Identify the point that forms the largest triangle area with the previous point (this is the point that best represents the bucket's trend).
   - Add the selected point to the result.
4. End with the last point, which is always included in the result to preserve the end of the data.

Benefits:
- The algorithm effectively reduces the number of data points while retaining the essential visual characteristics of the original data.
- It is particularly useful for visualizing large time series datasets, as it maintains key trends without overwhelming the viewer with too many points.
- By focusing on the largest triangle areas, the algorithm ensures that important peaks and valleys are not lost in the downsampling process.

This analysis can be used to evaluate the effectiveness of the downsampling and its impact on the dataset's integrity.
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lttb-analysis.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className='min-h-screen bg-background'>
      <Navbar onDocsClick={() => setShowDocs(!showDocs)} />

      {showDocs ? (
        <Documentation />
      ) : (
        <div className='max-w-4xl mx-auto p-8'>
          <div className='bg-card rounded-lg shadow-lg p-6'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-2'>
                <LineChart className='w-6 h-6 text-primary' />
                <h1 className='text-2xl font-bold'>
                  LTTB Algorithm Demonstration
                </h1>
              </div>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  onClick={() => setZoomRange(null)}
                  disabled={!zoomRange}
                >
                  <RotateCcw className='w-4 h-4 mr-2' />
                  Reset Zoom
                </Button>
                <Button onClick={downloadAnalysis}>
                  <Download className='w-4 h-4 mr-2' />
                  Download Analysis
                </Button>
              </div>
            </div>

            <ChartControls
              dataSize={dataSize}
              threshold={threshold}
              onDataSizeChange={setDataSize}
              onThresholdChange={setThreshold}
            />

            <DataComparison
              originalData={originalData.voltage}
              sampledData={sampledData.voltage}
            />

            <ChartVisualization
              originalData={originalData}
              sampledData={sampledData}
              zoomRange={zoomRange}
              onZoomChange={setZoomRange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
