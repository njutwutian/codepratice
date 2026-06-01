import { useMemo, useState } from "react";
import { mockTargets } from "./mockTargets";
import "./App.css";

const App = () => {
  const [selectedId, setSelectedId] = useState<string>(mockTargets[0].id);

  const selectedTarget = useMemo(() => {
    return mockTargets.find((item) => item.id === selectedId) ?? mockTargets[0];
  }, [selectedId]);

  return (
    <main className="practice-shell">
      <header className="header">
        <p className="badge">React Practice Lab</p>
        <h1>Choose a mock target component</h1>
        <p className="subtitle">
          Select a child component from the list and preview it in the canvas.
        </p>
      </header>

      <section className="workspace">
        <aside className="menu" aria-label="Mock target selector">
          {mockTargets.map((target) => {
            const isActive = target.id === selectedTarget.id;
            return (
              <button
                key={target.id}
                type="button"
                className={isActive ? "menu-item active" : "menu-item"}
                onClick={() => setSelectedId(target.id)}
              >
                <span>{target.title}</span>
                <small>{target.description}</small>
              </button>
            );
          })}
        </aside>

        <section className="canvas" aria-live="polite">
          <div className="canvas-head">
            <h2>{selectedTarget.title}</h2>
            <p>{selectedTarget.description}</p>
          </div>
          <div className="canvas-body">{selectedTarget.render()}</div>
        </section>
      </section>
    </main>
  );
};

export default App;
