import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LineElement, 
  PointElement, 
  LinearScale, 
  TimeScale, 
  Title, 
  Tooltip, 
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { APIService, EggPrice } from '../services/APIService';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend);

const EggPriceChart: React.FC = () => {
  const [prices, setPrices] = useState<EggPrice[]>([]);
  // Properly typed ref for a Line chart
  const chartRef = useRef<ChartJS<"line", number[], string> | null>(null);

  useEffect(() => {
    APIService.getEggPrices().then((data) => setPrices(data));
  }, []);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Clean up chart instance
      }
    };
  }, []);

  // Chart data with explicit typing
  const chartData: ChartData<"line", number[], string> = {
    labels: prices.map((p) => p.date),
    datasets: [
      {
        label: 'Egg Price (USD/dozen)',
        data: prices.map((p) => p.price),
        borderColor: '#4CAF50',
        fill: false,
      },
    ],
  };

  // Chart options with explicit typing for Line chart
  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: 'time', // No 'as const' needed with proper typing
        time: {
          unit: 'month',
          tooltipFormat: 'MMM yyyy',
        },
        title: { display: true, text: 'Date' },
      },
      y: {
        title: { display: true, text: 'Price (USD)' },
      },
    },
  };

  return (
    <div>
      <h2>Egg Price History</h2>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default EggPriceChart;