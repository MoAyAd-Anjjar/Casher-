import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DataProvider from "./Provider/DataProvider.js";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <DataProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
       />
    <App />
  </DataProvider>
);
