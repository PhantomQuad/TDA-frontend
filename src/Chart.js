import React, { useState, useEffect } from "react";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import Button from "react-bootstrap/Button";
import { BsGraphUp } from "react-icons/bs";
import { GoGraph } from "react-icons/go";

function Chart(props) {
  //   const [bootCampsFull, cBootCampsFull] = useState([]);

  //   const [bootCamps, cBootCamps] = useState([
  //     {
  //       value: "Software Dev Mar19",
  //     },
  //     {
  //       value: "Software Dev Mar20",
  //     },
  //     {
  //       value: "Software Dev Mar21",
  //     },
  //     {
  //       value: "Software Dev Mar22",
  //     },
  //     {
  //       value: "Data Science Mar19",
  //     },
  //     {
  //       value: "Data Science Mar20",
  //     },
  //     {
  //       value: "Data Science Mar21",
  //     },
  //     {
  //       value: "Data Science Mar22",
  //     },
  //   ]);
  //   bootCamps.map((current) => {
  //     bootCampsFull.push(current.value);
  //   });
  //   console.log(bootCampsFull);
  const switchType = (whichForm) => {
    if (whichForm != null) {
      if (whichForm == "line-chart") {
        document.getElementById("line-chart").style.display = "none";
        document.getElementById("bar-chart").style.display = "";
        // cDisabled(false);
      } else {
        document.getElementById("line-chart").style.display = "";
        document.getElementById("bar-chart").style.display = "none";
        // document.getElementById("fname").value = "";
        // cDisabled(true);
      }
    }
  };

  useEffect(() => {
    props.cNaviShow("hidden");
  }, []);

  return (
    <div style={{ padding: "1.5em" }}>
      <div id="buttons-chart">
        <center>
          <Button
            size="lg"
            variant="primary"
            className="chart-button-style"
            onClick={() => switchType("bar-chart")}
          >
            <BsGraphUp /> Line Chart
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            size="lg"
            variant="primary"
            className="chart-button-style"
            onClick={() => switchType("line-chart")}
          >
            <GoGraph /> Bar Chart
          </Button>
        </center>
      </div>
      <div className="chart-container">
        <div id="line-chart" className="chart-style">
          <LineChart />
        </div>
        <div id="bar-chart" className="chart-style" style={{ display: "none" }}>
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default Chart;
