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
  const [inputValue, setInputValue] = useState(() => {
    const initValue = defaultValue ?? value;
    return initValue ?? 0;
  });

  if ((min && inputValue < min) || (max && inputValue > max)) {
    throw new Error("value must be greater than min and less than max");
  }

  const updateValue = (v) => {
    if (isNaN(+value)) {
      setInputValue(v);
    }
    onChange?.(v);
  };

  // TODO  if input value > max then setInputValue to max, min also

  const handleChange = (e) => {
    updateValue(+e.target.value);
  };

  const handleDecrementClick = () => {
    if (disabled) return;
    if (inputValue - step <= min) {
      updateValue(min);
    } else {
      updateValue(inputValue - step);
    }
  };

  const handleIncrementClick = () => {
    if (disabled) return;
    if (inputValue + step >= max) {
      updateValue(max);
    } else {
      updateValue(inputValue + step);
    }
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
    e.target.value = +e.target.value;
  };

  useLayoutEffect(() => {
    if (typeof value === "number") {
      setInputValue(value);
    }
  }, [value]);

  return (
    <div
      className="border-2 border-dashed border-slate-400 p-2"
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
