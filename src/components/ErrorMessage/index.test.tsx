import { render } from "@testing-library/react";
import { ErrorMessage } from ".";

test("renders learn react link", () => {
  const { getByText } = render(<ErrorMessage message="error" />);

  expect(getByText(/error/i)).toBeInTheDocument();
});
