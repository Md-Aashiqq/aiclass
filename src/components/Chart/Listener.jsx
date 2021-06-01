

import { useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useState, useRef } from "react";

const Listener = ({callback}) => {
  
// const [chartData, setChartData] = useState({})
 
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
  
    
       
    console.log("data",data.newEmotion)
  
   

    

 
 
    
//   setChartData({
//     data: s,
//     labels:distinct
//   })

  return <h4></h4>
  
}

export default Listener;