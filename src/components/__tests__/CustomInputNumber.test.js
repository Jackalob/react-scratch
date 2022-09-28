import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import CustomInputNumber from "../CustomInputNumber";

test("input number increments and decrements when the buttons are clicked", async () => {
  render(<CustomInputNumber />);

  const decrement = screen.getByTestId("decrement-button");
  const increment = screen.getByTestId("increment-button");
  const input = screen.getByTestId("input");

  expect(input).toHaveValue(0);
  await userEvent.click(increment);
  expect(input).toHaveValue(1);
  await userEvent.click(decrement);
  expect(input).toHaveValue(0);
});
