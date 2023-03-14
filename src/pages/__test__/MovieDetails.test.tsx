import { render, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { store } from "../../app/store";

import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { MovieDetails } from "../MovieDetails";
import { MovieDetailsType } from "../../store/apis/moviesApi";

interface Body {
  id: string;
}

const server = setupServer(
  rest.get<Body, MovieDetailsType>(
    "https://api.themoviedb.org/3/movie/",
    (req, res, ctx) => {
      return res(
        ctx.json({
          title: "Star Wars",
          id: "1",
          backdrop_path: "123",
          tagline: "A long time ago in a galaxy far, far away...",
          overview:
            "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
        })
      );
    }
  )
);
beforeAll(() => server.listen());
afterAll(() => server.resetHandlers());
afterAll(() => server.close());

test("renders Movie Details", async () => {
  render(
    <Provider store={store}>
      <MovieDetails />
    </Provider>,
    { wrapper: BrowserRouter }
  );
  await waitFor(() =>
    screen.getByText("A long time ago in a galaxy far, far away...")
  );
});
