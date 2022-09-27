import React from "react";
import CustomInputNumber from "./components/CustomInputNumber";

const App = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CustomInputNumber min={-2} max={5} />
    </div>
  );
};

export default App;
