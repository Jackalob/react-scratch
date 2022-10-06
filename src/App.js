import React, { useState } from "react";
import CustomInputNumber from "./components/CustomInputNumber";

const App = () => {
  const [number, setNumber] = useState(0);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <CustomInputNumber
        min={50}
        max={100}
        defaultValue={50}
        onChange={(v) => console.log("onchange:", v)}
        onBlur={(e) => console.log("blur:", e)}
      />
    </div>
  );
};

export default App;
