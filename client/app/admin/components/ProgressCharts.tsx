'use client';

import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function ProgressCharts() {
  const paid = 65;
  const pending = 15;
  const overdue = 20

  const pieData = {
    labels: ['Paid', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [paid, pending, overdue],
        backgroundColor: ['#22c55e', '#e5e7eb', '#cdcdcd'],
      },
    ],
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Progress (%)',
        data: [20, 40, 60, 75],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34,197,94,0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[70%_25%] gap-6">

      <div className="p-4 border rounded-lg h-62.5">
        <h2 className="mb-4 font-semibold">Progress Trend</h2>
        <Line
          data={lineData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          }}
        />
      </div>

      <div className="p-4 border rounded-lg h-60 flex flex-col">
        <h2 className="mb-4 font-semibold">Fee Collection Overview</h2>
        <div>
          <Pie data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}