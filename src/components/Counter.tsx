import React, { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <button className="increment" onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
};

export default Counter;
