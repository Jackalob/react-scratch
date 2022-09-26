import React, { useState } from "react";
import { IconAdd, IconRemove } from "../assets/icons";

const CustomInputNumber = () => {
  const [number, setNumber] = useState(0);

  return (
    <div className="border-2 border-dashed border-slate-400 p-2">
      <div className="grid grid-cols-3 gap-2">
        <button className="w-12 h-12 border-2 border-blue-400 rounded flex justify-center items-center">
          <IconRemove className="fill-blue-400" />
        </button>
        <input
          className="w-12 h-12 border-2 rounded text-center text-base "
          value={number}
          type="number"
        />
        <button className="w-12 h-12 border-2 border-blue-400 rounded flex justify-center items-center">
          <IconAdd className="fill-blue-400" />
        </button>
      </div>
    </div>
  );
};

export default CustomInputNumber;
