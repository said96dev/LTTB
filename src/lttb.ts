export interface DataPoint {
  x: number;
  y: number;
}

export function lttb(data: DataPoint[], threshold: number): DataPoint[] {
  const dataLength = data.length;
  if (threshold >= dataLength || threshold === 0) {
    return data; // No downsampling needed
  }

  const sampled: DataPoint[] = [];
  let sampledIndex = 0;
  const bucketSize = (dataLength - 2) / (threshold - 2);
  let a = 0; // Start point
  let nextA = 0;

  sampled[sampledIndex++] = data[a]; // Add the first point

  for (let i = 0; i < threshold - 2; i++) {
    let avgX = 0;
    let avgY = 0;
    let avgRangeStart = Math.floor((i + 1) * bucketSize) + 1;
    let avgRangeEnd = Math.floor((i + 2) * bucketSize) + 1;
    avgRangeEnd = avgRangeEnd < dataLength ? avgRangeEnd : dataLength;
    const avgRangeLength = avgRangeEnd - avgRangeStart;

    for (; avgRangeStart < avgRangeEnd; avgRangeStart++) {
      avgX += data[avgRangeStart].x;
      avgY += data[avgRangeStart].y;
    }

    avgX /= avgRangeLength;
    avgY /= avgRangeLength;

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

    sampled[sampledIndex++] = data[nextA]; // Add the most important point
    a = nextA;
  }

  sampled[sampledIndex++] = data[dataLength - 1]; // Add the last point

  return sampled;
}