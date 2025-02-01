import ReactECharts from 'echarts-for-react'
import { DataPoint } from '../lttb'

interface ChartVisualizationProps {
  originalData: {
    voltage: DataPoint[]
    current: DataPoint[]
  }
  sampledData: {
    voltage: DataPoint[]
    current: DataPoint[]
  }
  zoomRange: { start: number; end: number } | null
  onZoomChange: (range: { start: number; end: number } | null) => void
}

export function ChartVisualization({
  originalData,
  sampledData,
  zoomRange,
  onZoomChange,
}: ChartVisualizationProps) {
  const option = {
    title: {
      text: 'Voltage and Current Data Visualization',
      left: 'center',
      textStyle: {
        color: '#000',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: [
        'Original Voltage',
        'LTTB Voltage',
        'Original Current',
        'LTTB Current',
      ],
      bottom: '0',
      textStyle: {
        color: '#000',
      },
      orient: 'horizontal',
      itemStyle: {
        opacity: 0,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      min: zoomRange?.start ?? 'dataMin',
      max: zoomRange?.end ?? 'dataMax',
      axisLine: {
        lineStyle: {
          color: 'hsl(var(--muted-foreground))',
        },
      },
      axisLabel: {
        color: 'hsl(var(--muted-foreground))',
      },
    },
    yAxis: [
      {
        name: 'Voltage (V)',
        type: 'value',
        position: 'left',
        axisLine: {
          lineStyle: {
            color: '#4ECDC4',
          },
        },
        axisLabel: {
          color: '#4ECDC4',
        },
      },
      {
        name: 'Current (A)',
        type: 'value',
        position: 'right',
        axisLine: {
          lineStyle: {
            color: '#FF6B6B',
          },
        },
        axisLabel: {
          color: '#FF6B6B',
        },
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
        onZoom: (params: any) => {
          const { start, end } = params
          const dataLength = originalData.voltage.length
          onZoomChange({
            start: Math.floor((start / 100) * dataLength),
            end: Math.ceil((end / 100) * dataLength),
          })
        },
      },
    ],
    series: [
      {
        name: 'Original Voltage',
        type: 'line',
        data: originalData.voltage.map((point) => [point.x, point.y]),
        showSymbol: false,
        yAxisIndex: 0,
        lineStyle: {
          color: '#c925bb',
          width: 1,
        },
      },
      {
        name: 'LTTB Voltage',
        type: 'line',
        data: sampledData.voltage.map((point) => [point.x, point.y]),
        showSymbol: false,
        yAxisIndex: 0,
        lineStyle: {
          color: '#4ECDC4',
          width: 2,
        },
      },
      {
        name: 'Original Current',
        type: 'line',
        data: originalData.current.map((point) => [point.x, point.y]),
        showSymbol: false,
        yAxisIndex: 1,
        lineStyle: {
          color: '#FFE66D',
          width: 1,
        },
      },
      {
        name: 'LTTB Current',
        type: 'line',
        data: sampledData.current.map((point) => [point.x, point.y]),
        showSymbol: false,
        yAxisIndex: 1,
        lineStyle: {
          color: '#FF6B6B',
          width: 2,
        },
      },
    ],
    backgroundColor: 'transparent',
  }

  return (
    <div className='relative'>
      <h2 className='text-lg font-semibold mb-2'>
        Visualization{' '}
        {zoomRange && `(Showing points ${zoomRange.start} to ${zoomRange.end})`}
      </h2>
      <div className='border rounded-lg p-4 bg-card'>
        <ReactECharts
          option={option}
          style={{ height: '400px' }}
          theme='custom'
        />
      </div>
    </div>
  )
}
