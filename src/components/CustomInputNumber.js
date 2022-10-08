import React, { useState, useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { IconAdd, IconRemove } from "../assets/icons";
import { KEYCODE } from "../utils/keycode";

const CustomInputNumber = ({
  min,
  max,
  step = 1,
  name,
  value,
  defaultValue,
  disabled,
  onChange,
  onBlur,
}) => {
  const initValue = defaultValue ?? value ?? 0;

  if (
    (min !== undefined && initValue < min) ||
    (max !== undefined && initValue > max)
  ) {
    throw new Error("value must be greater than min and less than max");
  }

  const [inputValue, setInputValue] = useState(initValue);
  const inputValueRef = useRef(initValue);

  const shouldInputUpdate = (v) => {
    let result = true;
    if (inputValue === v || inputValueRef.current === v) result = false;
    if (
      (typeof v === "number" && v <= min && inputValueRef.current === min) ||
      (typeof v === "number" && v >= max && inputValueRef.current === max)
    ) {
      result = false;
    }
    return result;
  };

  const getUpdateValue = (v) => {
    let newValue = v;
    if (typeof v === "number" && v > max) newValue = max;
    if (typeof v === "number" && v < min) newValue = min;

    let parsedValue = +newValue;
    if (parsedValue > max || parsedValue < min) {
      parsedValue = NaN;
    }

    return { newValue, parsedValue };
  };

  const updateValue = (v) => {
    const isNumber = typeof v === "number";
    const isNeedUpdate = shouldInputUpdate(v);
    const { newValue, parsedValue } = getUpdateValue(v);

    if (!isNeedUpdate) return;

    setInputValue(newValue);
    if (isNumber) {
      onChange?.(newValue);
      inputValueRef.current = newValue;
    } else if (!isNaN(parsedValue)) {
      onChange?.(parsedValue);
      inputValueRef.current = parsedValue;
    }
  };

  const handleChange = (e) => {
    // TODO handle special key e.g., e, -, empty string.
    updateValue(e.target.value);
  };

  const handleDecrementClick = () => {
    if (disabled) return;
    updateValue(inputValueRef.current - step);
  };

  const handleIncrementClick = () => {
    if (disabled) return;
    updateValue(inputValueRef.current + step);
  };

  const handleKeyDown = (e) => {
    const { code } = e;
    if (code === KEYCODE.LEFT) {
      handleDecrementClick();
      e.preventDefault();
    } else if (code === KEYCODE.RIGHT) {
      handleIncrementClick();
      e.preventDefault();
    }
  };

  const handleContainerBlur = (e) => {
    const isChildrenElement = e.currentTarget.contains(e.relatedTarget);
    if (!isChildrenElement) {
      onBlur?.(e);
    }
  };

  const handleInputBlur = (e) => {
    let newValue = +e.target.value;
    if (newValue === inputValueRef.current) return;
    if (newValue > max) {
      newValue = max;
    } else if (newValue < min) {
      newValue = min;
    }
    updateValue(newValue);
    e.target.value = newValue;
  };

  useLayoutEffect(() => {
    if (typeof value === "number") {
      setInputValue(value);
      inputValueRef.current = value;
    }
  }, [value]);

  return (
    <div
      className="border-2 border-dashed border-slate-400 p-2 inline-block"
      data-testid="custom-input-number"
      tabIndex={0}
      onBlur={handleContainerBlur}
      onKeyDown={handleKeyDown}
    >
      <div className="grid grid-cols-3 gap-2">
        <button
          className={clsx(
            "w-12 h-12 border-2 border-blue-400 rounded fill-blue-400 flex justify-center items-center focus:outline-none",
            disabled && "border-slate-200 fill-slate-200"
          )}
          onClick={handleDecrementClick}
          data-testid="decrement-button"
        >
          <IconRemove />
        </button>
        <input
          className="w-12 h-12 border-2 rounded text-center text-base"
          name={name}
          onChange={handleChange}
          onBlur={handleInputBlur}
          type="number"
          autoComplete="off"
          min={min}
          max={max}
          step={step}
          value={inputValue}
          disabled={disabled}
          data-testid="input"
        />
        <button
          className={clsx(
            "w-12 h-12 border-2 border-blue-400 rounded fill-blue-400 flex justify-center items-center focus:outline-none",
            disabled && "border-slate-200 fill-slate-200"
          )}
          onClick={handleIncrementClick}
          data-testid="increment-button"
        >
          <IconAdd />
        </button>
      </div>
    </div>
  );
};

CustomInputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default CustomInputNumber;
