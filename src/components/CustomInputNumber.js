import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconAdd, IconRemove } from "../assets/icons";
import { KEYCODE } from "../utils/keycode";

const CustomInputNumber = ({ min, max }) => {
  const [number, setNumber] = useState(0);

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const handleDecrementClick = () => {
    setNumber((num) => num - 1);
  };

  const handleIncrementClick = () => {
    setNumber((num) => num + 1);
  };

  const handleKeyDown = (e) => {
    // TODO 可以再優化
    const { which } = e;
    if (which === KEYCODE.LEFT && number !== min) {
      handleDecrementClick();
      e.preventDefault();
    } else if (which === KEYCODE.RIGHT && number !== max) {
      handleIncrementClick();
      e.preventDefault();
    }
  };

  return (
    <div
      className="border-2 border-dashed border-slate-400 p-2"
      onKeyDown={handleKeyDown}
    >
      <div className="grid grid-cols-3 gap-2">
        <button
          className="w-12 h-12 border-2 border-blue-400 rounded flex justify-center items-center"
          onClick={handleDecrementClick}
        >
          <IconRemove className="fill-blue-400" />
        </button>
        <input
          className="w-12 h-12 border-2 rounded text-center text-base "
          onChange={handleChange}
          value={number}
          type="number"
          autoComplete="off"
          min={min}
          max={max}
        />
        <button
          className="w-12 h-12 border-2 border-blue-400 rounded flex justify-center items-center"
          onClick={handleIncrementClick}
        >
          <IconAdd className="fill-blue-400" />
        </button>
      </div>
    </div>
  );
};

CustomInputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

export default CustomInputNumber;
