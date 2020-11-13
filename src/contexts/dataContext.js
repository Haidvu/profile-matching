import React, { createContext, useReducer } from "react";
import { dataReducer } from "../reducers/dataReducer";

export const DataContext = createContext();

const initialState = {};

const DataContextProvider = (props) => {
  const [data, dispatch] = useReducer(dataReducer, initialState);
  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
