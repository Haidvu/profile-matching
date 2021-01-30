import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DataContextProvider from "./contexts/dataContext";
import { ThemeProvider } from "@material-ui/core/styles";
import customTheme from "./customTheme";
import axios from "axios";

axios.defaults.baseURL = "http://52.173.242.147:8000/api";

ReactDOM.render(
  <DataContextProvider>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </DataContextProvider>,
  document.getElementById("root")
);
