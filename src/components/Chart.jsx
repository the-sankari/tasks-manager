import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { format, isWithinInterval } from "date-fns";

const BarChart = ({ task, observationInterval }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && task) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");

      const data = task?.activityLog?.map((entry) => ({
        x: new Date(entry.startTime),
        y:
          new Date(entry.endTime).getTime() -
          new Date(entry.startTime).getTime(),
      }));

      const totalActivityTime = data
        .filter((entry) =>
          isWithinInterval(entry.x, {
            start: observationInterval.start,
            end: observationInterval.end,
          })
        )
        .reduce((acc, entry) => acc + entry.y / (1000 * 60 * 60), 0);

      // Calculate total activity time for each day
      const dailyData = data.reduce((dailyAcc, entry) => {
        const entryDate = format(entry.x, "yyyy-MM-dd");
        dailyAcc[entryDate] = (dailyAcc[entryDate] || 0) + entry.y;
        return dailyAcc;
      }, {});

      console.log("dailyData", dailyData);

      const dailyChartData = Object.entries(dailyData).map(
        ([date, totalActivityTime]) => ({
          x: Date.parse(`${date} 00:00:00 GMT+0600`), // Set time to the beginning of the day
          y: totalActivityTime,
        })
      );

      const datasets = [
        {
          label: "Total Activity Duration",
          data: dailyChartData
            .filter((entry) =>
              isWithinInterval(entry.x, {
                start: observationInterval.start,
                end: observationInterval.end,
              })
            )
            .map((entry) => ({
              x: entry.x,
              y: entry.y, // Convert milliseconds to hours
            })),

          borderWidth: 1,
        },
      ];

      chartInstance.current = new Chart(ctx, {
        type: "bar",

        data: {
          datasets: datasets,
        },
        options: {
          // ...other options

          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  var label = context.dataset.label || "";

                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label += new Date(context.parsed.x).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    );
                    label += ": ";
                    label +=
                      (context.parsed.y / (1000 * 60 * 60)).toFixed(2) +
                      " hours";
                  }
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
                displayFormats: {
                  day: "MMM d",
                },
              },
              title: {
                display: true,
                text: "Day",
              },
            },
            y: {
              beginAtZero: true,

              title: {
                display: true,
                text: "Total Activity Duration (seconds)",
              },
            },
          },
        },
      });
    }
  }, [task, observationInterval]);

  //

  return (
    <div className="mt-10  flex m-auto items-center justify-center gap-10 ">
      <canvas ref={chartRef} className="!text-white w-11/12 h-[500px] px-10" />
    </div>
  );
};

export default BarChart;
