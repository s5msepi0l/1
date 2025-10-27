"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export default function PointStyleChart() {
    const chartRef = useRef<any>(null);

    const [chartData, setChartData] = useState<number[]>([]);

    useEffect(() => {
            (async() => {
              const response = await fetch("/api/score", {method: "GET"});
              const data = await response.json();
              
              console.log("data: ", data);
              setChartData(data);
            })();
        },
        []
    )

    const labels = chartData.map((_, i) => i);

    const data = {
        labels,
        datasets: [
        {
            data: chartData,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            pointStyle: "circle",
            pointRadius: 5,
            pointHoverRadius: 10,
        },
      ],
    };

        
    const config = {
        type: "line" as const,
        data,
        options: {
            responsive: true,
            plugins: {
            title: { display: false },
            legend: { display: false },
            },
            scales: {
            y: {
                display: false, // ✅ hides Y-axis (ticks + line)
                grid: {
                display: false, // ✅ hides grid lines
                drawBorder: false,
                },
            },
            x: {
                grid: {
                display: false, // optional: hide vertical grid lines too
                drawBorder: false,
                },
            },
            },
        },  
    };  


    const pointStyles = [
        "circle",
        "cross",
        "crossRot",
        "dash",
        "line",
        "rect",
        "rectRounded",
        "rectRot",
        "star",
        "triangle",
        "false",
    ];

    const handleAction = (style: string | boolean) => {
      const chart = chartRef.current;
      if (!chart) return;
      chart.data.datasets.forEach((dataset: any) => {
        dataset.pointStyle = style === "false" ? false : style;
      });
      chart.update();
    };

    return (
      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-3xl">
          <Line ref={chartRef} {...config} />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {pointStyles.map((style) => (
            <button
              key={style}
              onClick={() => handleAction(style === "false" ? false : style)}
            >
            </button>
          ))}
        </div>
      </div>
    );
}