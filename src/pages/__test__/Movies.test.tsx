import { render, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { Movies } from "../Movies";
import { store } from "../../app/store";

import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

interface Body {
  id: string;
}
interface Response {
  results: string;
}

const server = setupServer(
  rest.get<Body, Response>(
    "https://api.themoviedb.org/3/discover/movie",
    (req, res, ctx) => {
      return res(
        ctx.json({
          results: [{ title: "Star Wars", id: "1", backdrop_path: "123" }],
        })
      );
    }
  ),
  rest.get<Body, Response>(
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
  await waitFor(() => screen.getByText("Star Wars"));
});
