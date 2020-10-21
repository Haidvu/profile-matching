import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DataContextProvider from "./contexts/dataContext";
import { ThemeProvider } from "@material-ui/core/styles";
import customTheme from "./customTheme";

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
