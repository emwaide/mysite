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

type ForecastGraphProps = {
  data: number[];
  timestamps: string[];
  label: string;
};

export default function ForecastGraph({ data, timestamps, label }: ForecastGraphProps) {
  const chartData = timestamps.map((timestamp, index) => ({
    time: new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Use true for 12-hour format with AM/PM
    }),
    value: data[index],
  }));

  return (
    <div className="bg-primary dark:bg-primary rounded-xl p-6 w-full h-80">
      <h3 className="text-lg font-semibold mb-4 text-white dark:text-white">
        Forecast for the next 24 hours ({label})
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="white" />
          <XAxis dataKey="time" stroke="white" tick={{ fill: 'white', dy: 8 }} />
          <YAxis stroke="white" tick={{ fill: 'white', dx: -8 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white', // soft light
              borderColor: 'black',
              color: 'black',
            }}
            labelStyle={{ color: 'black', padding: '2px' }}
            itemStyle={{ color: 'black', padding: '2px' }}
          />
          <Line type="monotone" dataKey="value" stroke="#2d82b7" strokeWidth={3} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
