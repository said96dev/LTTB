import React from 'react'

export function Documentation() {
  return (
    <div className='min-h-screen bg-background text-foreground p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <h1 className='text-4xl font-bold text-primary mb-8'>
          LTTB Algorithm Documentation
        </h1>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold text-primary'>
            Algorithm Overview
          </h2>
          <p className='text-muted-foreground'>
            The Largest-Triangle-Three-Buckets (LTTB) algorithm is a
            downsampling technique that preserves the visual characteristics of
            time series data while reducing the number of points.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold text-primary'>
            Implementation
          </h2>
          <div className='bg-card rounded-lg p-6 border shadow-lg'>
            <pre className='text-sm text-muted-foreground overflow-x-auto'>
              {`export function lttb(data: Point[], threshold: number): Point[] {
  const dataLength = data.length;
  if (threshold >= dataLength || threshold === 0) {
    return data; // No downsampling needed
  }

  const sampled: Point[] = [];
  let sampledIndex = 0;
  const bucketSize = (dataLength - 2) / (threshold - 2);
  let a = 0; // Start point
  let nextA = 0;

  sampled[sampledIndex++] = data[a]; // Add first point

  for (let i = 0; i < threshold - 2; i++) {
    let avgX = 0, avgY = 0;
    let avgRangeStart = Math.floor((i + 1) * bucketSize) + 1;
    let avgRangeEnd = Math.floor((i + 2) * bucketSize) + 1;
    avgRangeEnd = avgRangeEnd < dataLength ? avgRangeEnd : dataLength;
    const avgRangeLength = avgRangeEnd - avgRangeStart;

    // Calculate average of next bucket
    for (; avgRangeStart < avgRangeEnd; avgRangeStart++) {
      avgX += data[avgRangeStart].x;
      avgY += data[avgRangeStart].y;
    }
    avgX /= avgRangeLength;
    avgY /= avgRangeLength;

    // Find point that creates largest triangle
    let rangeOffs = Math.floor((i + 0) * bucketSize) + 1;
    const rangeTo = Math.floor((i + 1) * bucketSize) + 1;
    const pointAX = data[a].x;
    const pointAY = data[a].y;
    let maxArea = -1;

    for (; rangeOffs < rangeTo; rangeOffs++) {
      const area = Math.abs(
        (pointAX - avgX) * (data[rangeOffs].y - pointAY) -
        (pointAX - data[rangeOffs].x) * (avgY - pointAY)
      );
      if (area > maxArea) {
        maxArea = area;
        nextA = rangeOffs;
      }
    }

    sampled[sampledIndex++] = data[nextA];
    a = nextA;
  }

  sampled[sampledIndex++] = data[dataLength - 1]; // Add last point
  return sampled;
}`}
            </pre>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold text-primary'>
            Step-by-Step Example
          </h2>
          <div className='bg-card rounded-lg p-6 border shadow-lg space-y-4'>
            <h3 className='text-xl font-medium'>Input Data (10 points)</h3>
            <pre className='text-sm text-muted-foreground'>
              {`[
  { x: 0, y: 10 }, { x: 1, y: 12 }, { x: 2, y: 15 },
  { x: 3, y: 11 }, { x: 4, y: 13 }, { x: 5, y: 16 },
  { x: 6, y: 14 }, { x: 7, y: 12 }, { x: 8, y: 15 },
  { x: 9, y: 13 }
]`}
            </pre>

            <div className='space-y-2'>
              <h4 className='font-medium'>Step 1: Initialize</h4>
              <ul className='list-disc list-inside text-muted-foreground'>
                <li>Threshold = 5 points</li>
                <li>Bucket size = (10 - 2) / (5 - 2) = 2.67</li>
                <li>Add first point: {`{ x: 0, y: 10 }`}</li>
              </ul>
            </div>

            <div className='space-y-2'>
              <h4 className='font-medium'>Step 2: Process Buckets</h4>
              <ul className='list-disc list-inside text-muted-foreground'>
                <li>Bucket 1 (points 1-3): Selected {`{ x: 2, y: 15 }`}</li>
                <li>Bucket 2 (points 4-6): Selected {`{ x: 5, y: 16 }`}</li>
                <li>Bucket 3 (points 7-8): Selected {`{ x: 7, y: 12 }`}</li>
              </ul>
            </div>

            <div className='space-y-2'>
              <h4 className='font-medium'>Step 3: Finalize</h4>
              <ul className='list-disc list-inside text-muted-foreground'>
                <li>Add last point: {`{ x: 9, y: 13 }`}</li>
              </ul>
            </div>

            <div className='mt-4 pt-4 border-t'>
              <h4 className='font-medium'>Final Result (5 points)</h4>
              <pre className='text-sm text-muted-foreground'>
                {`[
  { x: 0, y: 10 },  // First point
  { x: 2, y: 15 },  // Largest triangle from bucket 1
  { x: 5, y: 16 },  // Largest triangle from bucket 2
  { x: 7, y: 12 },  // Largest triangle from bucket 3
  { x: 9, y: 13 }   // Last point
]`}
              </pre>
            </div>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold text-primary'>Key Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-card rounded-lg p-6 border shadow-lg'>
              <h3 className='text-xl font-medium mb-4'>Algorithm Benefits</h3>
              <ul className='space-y-2 text-muted-foreground'>
                <li>• Preserves visual characteristics</li>
                <li>• Maintains important peaks and valleys</li>
                <li>• Reduces data size significantly</li>
                <li>• Works with any time series data</li>
              </ul>
            </div>
            <div className='bg-card rounded-lg p-6 border shadow-lg'>
              <h3 className='text-xl font-medium mb-4'>Technical Details</h3>
              <ul className='space-y-2 text-muted-foreground'>
                <li>• O(n) time complexity</li>
                <li>• Maintains data sequence</li>
                <li>• Preserves first and last points</li>
                <li>• Adaptive bucket sizing</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
