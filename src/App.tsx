import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieDetails } from "./pages/MovieDetails";
import { Movies } from "./pages/Movies";
import { RootLayout } from "./pages/Root";
import { TvserieDetails } from "./pages/TvserieDetails";
import { Tvseries } from "./pages/Tvseries";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Movies /> },
      { path: "/tvseries", element: <Tvseries /> },
      { path: "/:movieId", element: <MovieDetails /> },
      { path: "/tvseries/:tvserieId", element: <TvserieDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
