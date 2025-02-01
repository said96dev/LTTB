# LTTB Algorithm Demonstration - User Manual

## Introduction

Welcome to the LTTB (Largest-Triangle-Three-Buckets) Algorithm Demonstration application. This tool helps you understand and visualize how the LTTB algorithm works for data downsampling while preserving visual characteristics of time series data.

## What is LTTB?

LTTB (Largest-Triangle-Three-Buckets) is a data downsampling algorithm designed to reduce the number of points in a dataset while maintaining its visual characteristics. It's particularly useful for:

- Visualizing large time series data
- Reducing data transmission size
- Improving rendering performance
- Maintaining visual trends and patterns

## How LTTB Works

1. **Initial Setup**
   - The algorithm starts with the first point
   - Divides the remaining points into buckets
   - Always keeps the last point

2. **For Each Bucket**
   - Calculates the average point in the next bucket
   - Finds the point in the current bucket that creates the largest triangle area with the previous selected point and the next bucket's average
   - Selects this point for the final dataset

3. **Benefits**
   - Preserves visual trends
   - Maintains extremes better than simple averaging
   - Reduces data points significantly
   - Keeps important visual characteristics

## Using the Application

### Controls

1. **Data Points Slider**
   - Controls the number of points in the original dataset
   - Range: 100 to 10,000 points
   - More points = more detailed original data

2. **LTTB Threshold Slider**
   - Sets the number of points in the downsampled result
   - Must be less than the original data points
   - Higher threshold = more detail preserved

3. **Zoom Controls**
   - Click and drag on the chart to zoom into a specific area
   - Use the "Reset Zoom" button to view the full dataset
   - The LTTB algorithm is reapplied to the zoomed area

### Visualization

The chart shows two lines:
- Gray line: Original dataset
- Blue line: LTTB downsampled data

### Data Comparison Table

Shows statistics about both datasets:
- Number of points
- Memory usage
- Compression ratio

### Analysis Download

Click the "Download Analysis" button to get a detailed report including:
- Current settings
- Data points comparison
- Algorithm steps
- Benefits and usage

## Tips for Best Results

1. **Choosing Threshold**
   - Start with about 10% of original points
   - Adjust based on visual quality needed
   - Consider device performance

2. **Data Size**
   - Larger datasets show LTTB's benefits better
   - Try different sizes to see the effect

3. **Zooming**
   - Use zoom to examine specific features
   - Compare original vs downsampled in detail
   - Notice how LTTB preserves important points

## Understanding the Results

1. **Visual Quality**
   - The downsampled line should follow the original's trend
   - Major peaks and valleys should be preserved
   - Small details may be smoothed out

2. **Performance Impact**
   - Fewer points = faster rendering
   - Check the memory usage comparison
   - Notice the compression ratio

## Technical Details

The LTTB algorithm works in three main steps:

1. **Bucket Creation**
   ```javascript
   bucketSize = (dataLength - 2) / (threshold - 2)
   ```

2. **Point Selection**
   - For each bucket, finds point creating largest triangle
   - Uses area calculation:
   ```javascript
   area = abs((ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) / 2)
   ```

3. **Result Assembly**
   - First point → Selected points → Last point
   - Maintains data continuity

## Troubleshooting

Common issues and solutions:

1. **Slow Performance**
   - Reduce the number of original data points
   - Lower the threshold value
   - Clear browser cache

2. **Visual Artifacts**
   - Increase the threshold for more detail
   - Check if zoom is active
   - Reset zoom to see full picture

3. **Unexpected Results**
   - Verify data point range is appropriate
   - Ensure threshold is less than data points
   - Try resetting to default values

## Best Practices

1. **Data Preparation**
   - Use clean, sorted data
   - Remove invalid points
   - Normalize if necessary

2. **Threshold Selection**
   - Balance detail vs performance
   - Consider display size
   - Test with target device

3. **Visualization**
   - Use zoom for detailed analysis
   - Compare before/after
   - Check critical points preserved

## Support

For additional help or technical details:
- Check the source code comments
- Review the algorithm implementation
- Experiment with different parameters