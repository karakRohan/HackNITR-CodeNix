import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
import "./i18n";


import App from "./App.jsx";
import "./index.css";
import rootReducer from "./reducer/index.js";

// Redux store configuration
const store = configureStore({
  reducer: rootReducer,
});

// App render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster position="bottom-left" />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
