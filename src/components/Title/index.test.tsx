import { render } from "@testing-library/react";
import { Title } from ".";

test("renders learn react link", () => {
  const { getByText } = render(<Title text="the movies" />);

  expect(getByText(/movies/i)).toBeInTheDocument();
});
