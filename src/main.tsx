import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./shared/styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/api";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found");
}

const StrictModeWrapper =
  import.meta.env.MODE === "development" ? React.StrictMode : React.Fragment;

ReactDOM.createRoot(root).render(
  <StrictModeWrapper>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictModeWrapper>
);
