import { useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Doughnut } from "react-chartjs-2";
import Listener from "./Listener";

import "./style.css";



function Chart() {
  

  const [ChartData, setChartData] = useState([])
  const [labels, setLabels] = useState([])
  
 

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
    return <div>Loading</div>

  }
  if (error) {
    console.log(error)
    }
  console.log("data", data.newEmotion)
  var unique = []; var distinct = [];
  var labe =[]
 
      var emotions = data.newEmotion
    
    for (let i = 0; i < emotions.length; i++){
    if( !unique[emotions[i].type]){
      distinct.push(emotions[i].type);
      unique[emotions[i].type] = 1;
    }
    }
    console.log(distinct)
    // setLabels(distinct)
    
    distinct.forEach(element => {
     let d = 0
      emotions.forEach(({id,type}) => {
        if (type === element) {
          d++
  }
      });
    labe.push(d)
  });

  console.log(labe)
 console.log(distinct)
  let state;
  if (!loading) {
     state = {
    labels: distinct,
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
        data: labe,
      },
    ],
  };
 }

  return (

    <div>
      {loading ? <div>Loading</div> : (<div className="chart__area">
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
  
    </div>)}
    </div>
    
  );
}

export default Chart;
