import React from "react";
import { Line } from "react-chartjs-2";
import {
  LinearScale,
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days }) => {
  const prices = [];
  const date = [];

  for (let i = 0; i < arr.length; i++) {
    days === "24h"
      ? date.push(new Date(arr[i][0]).toLocaleTimeString())
      : date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }


  const data = {
    labels: date,
    datasets: [
      {
        label: `Price in ${currency}`,
        data: prices,
        backgroundColor: "rgba(255, 99, 132,0.5)",
      },
    ],
  };

  return <Line options={{ responsive: true }} data={data} />;
};

export default Chart;
