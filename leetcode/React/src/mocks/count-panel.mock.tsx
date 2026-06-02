import React from "react";
import type { MockTargetDefinition } from "../mockTargets";

const target: MockTargetDefinition = {
  id: "count-panel",
  title: "Mock Count Panel",
  description: "Mock count button.",
  Component: () => {
    const [count, setCount] = React.useState(0);
    return (
      <article className="mock-card count-card">
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div>
            <p className="chip">Count Summary</p>
          </div>
          <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="label">{count}</span>
          <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
          </div>
        </div>
      </article>
    );
  }
};

export default target;
