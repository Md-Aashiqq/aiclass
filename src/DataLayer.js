import React, { useContext, useReducer } from "react";

//Create Context
const DataLayerContext = React.createContext();

//Create Provider
export const DataLayer = ({ initialstate, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialstate)}>
    {children}
  </DataLayerContext.Provider>
);
//Export Context to be used by other components
export const useDataLayerValue = () => useContext(DataLayerContext);
