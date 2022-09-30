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

test("input number increments and decrements when the arrow keys are pressed", async () => {
  // user-event@14: not support for e.keyCode, ref: https://github.com/testing-library/user-event/issues/1006#issuecomment-1201131310
  render(<CustomInputNumber />);

  const customInputNumber = screen.getByTestId("custom-input-number");
  const input = screen.getByTestId("input");

  customInputNumber.focus();

  expect(input).toHaveValue(0);
  await userEvent.keyboard("{ArrowRight>5}");
  expect(input).toHaveValue(5);
  await userEvent.keyboard("{ArrowLeft>5}");
  expect(input).toHaveValue(0);
});

describe("console errors", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  test("given input number value must be greater than min", async () => {
    expect(() =>
      render(<CustomInputNumber value={10} max={500} min={100} />)
    ).toThrowErrorMatchingInlineSnapshot(
      `"value must be greater than min and less than max"`
    );
    expect(console.error).toHaveBeenCalled();
  });

  test("given input number value must be less than max", async () => {
    expect(() =>
      render(<CustomInputNumber value={10} max={5} min={1} />)
    ).toThrowErrorMatchingInlineSnapshot(
      `"value must be greater than min and less than max"`
    );
    expect(console.error).toHaveBeenCalled();
  });
});

// test("input number is not greater than max or less than min when the value changes", async () => {
//   const m
//   render(<CustomInputNumber />);
// })
