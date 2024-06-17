import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import HomePage from "./pages/HomePage.jsx";
import Protected from "./components/Protected.jsx";
import AddRecordPage from "./pages/AddRecordPage.jsx";
import AddCustomerPage from "./pages/AddCustomerPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/add-customer",
        element: (
          <Protected>
            <AddCustomerPage />
          </Protected>
        ),
      },
      {
        path: "/add-record",
        element: (
          <Protected>
            <AddRecordPage />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
