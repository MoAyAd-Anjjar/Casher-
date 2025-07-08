import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DataProvider from "./Provider/DataProvider";
import { ToastContainer } from "react-toastify";
import App from "./App"
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
