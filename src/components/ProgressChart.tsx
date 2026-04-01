import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DailyRecord } from '../constants';
import { formatDateForChart } from '../utils/dateUtils';

interface ProgressChartProps {
  data: DailyRecord[];
  days?: number;
  mini?: boolean;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  days = 30,
  mini = false,
}) => {
  // Fill in missing days with null values for the chart
  const chartData = React.useMemo(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days + 1);

    const filled: Array<{
      date: string;
      displayDate: string;
      wpm: number | null;
      accuracy: number | null;
    }> = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const record = data.find(r => r.date === dateStr);
      filled.push({
        date: dateStr,
        displayDate: formatDateForChart(dateStr),
        wpm: record ? record.avgWpm : null,
        accuracy: record ? record.avgAccuracy : null,
      });
    }

    return filled;
  }, [data, days]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={mini ? 100 : 300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="displayDate"
          tick={{ fontSize: 10 }}
          interval={mini ? 6 : 2}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="wpm"
          domain={[0, 150]}
          tick={{ fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <YAxis
          yAxisId="accuracy"
          orientation="right"
          domain={[0, 100]}
          tick={{ fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        {!mini && (
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value: number, name: string) => [
              name === 'wpm' ? `${value} WPM` : `${value}%`,
              name === 'wpm' ? 'Speed' : 'Accuracy',
            ]}
          />
        )}
        <Line
          yAxisId="wpm"
          type="monotone"
          dataKey="wpm"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          connectNulls
        />
        <Line
          yAxisId="accuracy"
          type="monotone"
          dataKey="accuracy"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
