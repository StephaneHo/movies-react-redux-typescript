import { render, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { store } from "../../app/store";

import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { TvserieDetails } from "../TvserieDetails";
import { TvserieDetailsType } from "../../store/apis/tvseriesApi";

interface Body {
  id: string;
}

const server = setupServer(
  rest.get<Body, TvserieDetailsType>(
    "https://api.themoviedb.org/3/tv/",
    (req, res, ctx) => {
      return res(
        ctx.json({
          name: "The Mandalorian",
          id: "1",
          backdrop_path: "123",
          tagline: "Bounty hunting is a complicated profession.",
          overview:
            "After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches, earning his keep as a bounty hunter.",
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
      <TvserieDetails />
    </Provider>,
    { wrapper: BrowserRouter }
  );
  await waitFor(() =>
    screen.getByText("Bounty hunting is a complicated profession.")
  );
});
