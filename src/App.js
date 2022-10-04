import React from "react";
import CustomInputNumber from "./components/CustomInputNumber";

const App = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CustomInputNumber
        onChange={(v) => console.log("change:", v)}
        onBlur={(e) => console.log("blur:", e)}
      />
    </div>
  );
};

export default App;
