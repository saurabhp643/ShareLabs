import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import moment from 'moment';

function MyChart() {
  const [chartData, setChartData] = useState({});
  const chartRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    // Function to make the API call and fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.llama.fi/summary/fees/lyra?dataType=dailyFees');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Process the data and extract the "totalDataChart" parameter
        const totalDataChart = data.totalDataChart;
        const timestamps = totalDataChart.map(item => new Date(item[0] * 1000));
        const values = totalDataChart.map(item => item[1]);

        // Create chart data
        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: 'Values',
              data: values,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create the new chart once chartData is updated
    const ctx = document.getElementById('myChart');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Value',
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const timestamp = context.parsed.x;
                const value = context.parsed.y;
                const formattedDate = moment(timestamp).format('YYYY-MM-DD'); // Format the date with Moment.js
                return `Date: ${formattedDate}, Value: ${value}`;
              },
            },
          },
        },
      },
    });
  }, [chartData]);

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default MyChart;
