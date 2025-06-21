'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

type ForecastGraphProps = {
  data: number[];
  timestamps: string[];
  label: string;
};

type ChartDataPoint = {
  time: string;
  value: number;
};

function CustomTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (!active || !payload || !payload.length) return null;

  const style: React.CSSProperties = {
    backgroundColor: 'white',
    border: '1px solid black',
    color: 'black',
    padding: '8px',
    fontSize: '0.875rem',
    maxWidth: '200px',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
  };

  return (
    <div className="tooltip-content" style={style}>
      <p className="font-bold">{label}</p>
      {payload.map((entry, index) => (
        <p key={index}>
          {entry.name}: <strong>{entry.value}</strong>
        </p>
      ))}
    </div>
  );
}

export default function ForecastGraph({ data, timestamps, label }: ForecastGraphProps) {
  const chartData: ChartDataPoint[] = timestamps.map((timestamp, index) => ({
    time: new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    value: data[index],
  }));

  return (
    <div className="bg-primary dark:bg-primary rounded-xl p-6 w-full h-80 relative">
      <h3 className="text-lg font-semibold mb-4 text-white dark:text-white">
        Forecast for the next 24 hours ({label})
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="white" />
          <XAxis dataKey="time" stroke="white" tick={{ fill: 'white', dy: 8 }} />
          <YAxis stroke="white" tick={{ fill: 'white', dx: -8 }} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="value" stroke="#2d82b7" strokeWidth={3} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
