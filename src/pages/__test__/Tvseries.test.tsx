import { render, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { store } from "../../app/store";

import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Tvseries } from "../Tvseries";

interface LoginBody {
  username: string;
}
interface LoginResponse {
  username: string;
  firstName: string;
}
const server = setupServer(
  rest.get<LoginBody, LoginResponse>(
    "https://api.themoviedb.org/3/discover/tv",
    (req, res, ctx) => {
      return res(
        ctx.json({
          results: [{ name: "The Mandalorian", id: "1", backdrop_path: "123" }],
        })
      );
    }
  ),
  rest.get<LoginBody, LoginResponse>(
    "https://api.themoviedb.org/3/search/tv",
    (req, res, ctx) => {
      return res(
        ctx.json({
          results: [{ name: "The Mandalorian", id: "1", backdrop_path: "123" }],
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
      <Tvseries />
    </Provider>,
    { wrapper: BrowserRouter }
  );
  await waitFor(() => screen.getByText("The Mandalorian"));
});
