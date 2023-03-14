import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { render, renderHook, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider, useDispatch } from "react-redux";
import { searchMovie } from "../store/apis/movieSlice";
import { Movies } from "./Movies";
import { store } from "../app/store";
import {
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
} from "react-router-dom";
import { routesConfig } from "../App";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

interface LoginBody {
  username: string;
}
interface LoginResponse {
  username: string;
  firstName: string;
}
const server = setupServer(
  rest.get<LoginBody, LoginResponse>(
    "https://api.themoviedb.org/3/discover/movie",
    (req, res, ctx) => {
      return res(
        ctx.json({
          results: [{ title: "Star Wars", id: "1", backdrop_path: "123" }],
        })
      );
    }
  ),
  rest.get<LoginBody, LoginResponse>(
    "https://api.themoviedb.org/3/search/movie",
    (req, res, ctx) => {
      return res(
        ctx.json({
          results: [{ title: "Star Wars", id: "1", backdrop_path: "123" }],
        })
      );
    }
  )
);
beforeAll(() => server.listen());
afterAll(() => server.resetHandlers());
afterAll(() => server.close());

test("renders Movies", async () => {
  render(
    <Provider store={store}>
      <Movies />
    </Provider>,
    { wrapper: BrowserRouter }
  );
  //render(<RouterProvider router={router} />);
  const item = await waitFor(() => screen.getByText("Star Wars"));
});
