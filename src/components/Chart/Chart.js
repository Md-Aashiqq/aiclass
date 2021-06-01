import { useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
// import { Apollo_Client } from "../../Helper/Apollo-client";
import "./style.css";


const ListenEmotion = () => {
  
  const NEWEMOTION_SUBSCRIPTION = gql`
  subscription newEmotion {
    newEmotion {
      id
      type
    }
  }
`;
  
  
  const { data, loading , error } = useSubscription(NEWEMOTION_SUBSCRIPTION);
  if (loading) {
    console.log("loading")
    return <div>ading</div>

  }
  if (error) {
    console.log(error)
  }

  console.log("data",data)

  return <h4></h4>
  

}


function Chart() {
  
  const state = {
    labels: ["sad", "happy", "netural"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
        data: [5, 3, 1],
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
      <ListenEmotion />
    </div>
  );
}

export default Chart;
