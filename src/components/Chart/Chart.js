import React, { useEffect, useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
// import { Apollo_Client } from "../../Helper/Apollo-client";
import "./style.css";

function Chart() {
  const apollo_client_ins = useRef(null);

  // useEffect(() => {
  //   startApolloCleint();
  // }, []);

  // const startApolloCleint = async () => {
  //   apollo_client_ins.current = Apollo_Client();
  //   // console.log(apollo_client_ins);
  //   const { sendEmotion } = apollo_client_ins.current;
  //   console.log(sendEmotion());
  //   computePercantage();
  // };

  // const computePercantage = () => {
  //   console.log(apollo_client_ins.current);
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(apollo_client_ins.current);
  //   }, 2000);
  // }, []);
  const state = {
    labels: ["sad", "happy", "netural"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
        data: [65, 59, 80],
      },
    ],
  };

  return (
    <div className="chart__area">
      <Doughnut
        data={state}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}

export default Chart;
