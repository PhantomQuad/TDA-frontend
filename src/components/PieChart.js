import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

function PieChart(props) {
  return (
    <div>
      <PolarArea
        datasetIdKey="id"
        data={{
          labels: [
            "Software Dev Mar19",
            "Software Dev Mar20",
            "Software Dev Mar21",
            "Software Dev Mar22",
            "Data Science Mar19",
            "Data Science Mar20",
            "Data Science Mar21",
            "Data Science Mar22",
          ],
          datasets: [
            {
              id: 1,
              label: ["Software Dev Mar19", "Software Dev Mar20"],
              data: [5, 6, 7, 5, 7, 8, 5, 7],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              id: 2,
              label: "Hired",
              data: [3, 2, 2, 3, 2, 1, 4, 5],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
}

export default PieChart;
