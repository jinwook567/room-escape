import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const theme = createTheme({
  spacing: 8,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
