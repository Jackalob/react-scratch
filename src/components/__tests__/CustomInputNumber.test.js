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

test("step prop works", async () => {
  const step = 5;
  render(<CustomInputNumber step={step} />);

  const customInputNumber = screen.getByTestId("custom-input-number");
  const decrement = screen.getByTestId("decrement-button");
  const increment = screen.getByTestId("increment-button");
  const input = screen.getByTestId("input");

  expect(input).toHaveValue(0);
  await userEvent.click(increment);
  expect(input).toHaveValue(5);
  await userEvent.click(decrement);
  expect(input).toHaveValue(0);

  customInputNumber.focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(input).toHaveValue(5);
  await userEvent.keyboard("{ArrowLeft}");
  expect(input).toHaveValue(0);
});

test("input number is not greater than max or less than min when the value changes", async () => {
  const max = 15,
    min = 0,
    value = 1,
    step = 5;
  render(<CustomInputNumber step={step} value={value} max={max} min={min} />);

  const decrement = screen.getByTestId("decrement-button");
  const increment = screen.getByTestId("increment-button");
  const input = screen.getByTestId("input");

  // to min
  const decrementTimes = Math.floor((value - min) / step) + 1;
  for (let i = 0; i < decrementTimes + 1; i++) {
    await userEvent.click(decrement);
  }
  expect(input).toHaveValue(min);

  // to max
  const incrementTimes = Math.floor((max - min) / step) + 1;
  for (let i = 0; i < incrementTimes + 1; i++) {
    await userEvent.click(increment);
  }
  expect(input).toHaveValue(max);
});
