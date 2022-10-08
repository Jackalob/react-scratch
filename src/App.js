import React, { useState } from "react";
import CustomInputNumber from "./components/CustomInputNumber";

const App = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CustomInputNumber
        min={-10}
        max={10}
        defaultValue={10}
        onChange={(v) => console.log("onchange:", v)}
        onBlur={(e) => console.log("blur:", e)}
      />
    </div>
  );
};

export default App;
