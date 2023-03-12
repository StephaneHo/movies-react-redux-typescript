import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Movies } from "./pages/Movies";
import { RootLayout } from "./pages/Root";
import { Tvseries } from "./pages/Tvseries";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Movies /> },
      { path: "/tvseries", element: <Tvseries /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
