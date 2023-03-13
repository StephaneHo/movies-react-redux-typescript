import { render, fireEvent, screen } from "@testing-library/react";
import { useRef } from "react";
import { SearchBar } from ".";

test("renders learn react link", () => {
  const handleFilter = jest.fn();
  const clearInput = jest.fn();
  render(
    <SearchBar
      handleFilter={handleFilter}
      clearInput={clearInput}
      wordEntered="test"
    />
  );
  const search = screen.getByLabelText("search");
  expect(search).toBeDefined();
  fireEvent.change(search, { target: { value: "It is a very good day" } });
  expect(handleFilter).toHaveBeenCalledTimes(1);
});

test("renders learn react link", () => {
  const handleFilter = jest.fn();
  const clearInput = jest.fn();
  render(
    <SearchBar
      handleFilter={handleFilter}
      clearInput={clearInput}
      wordEntered="test"
    />
  );
  const clear = screen.getByLabelText("clear");
  expect(clear).toBeDefined();
  fireEvent.click(clear);
  expect(clearInput).toHaveBeenCalledTimes(1);
});
