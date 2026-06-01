import type { MockTargetDefinition } from "../mockTargets";

const target: MockTargetDefinition = {
  id: "todo-board",
  title: "Mock Todo Board",
  description: "Simple task board layout with ordered list content.",
  Component: () => {
    return (
      <article className="mock-card todo-card">
        <header>
          <p className="chip">Todo Board</p>
          <h3>Weekly Tasks</h3>
        </header>
        <ol>
          <li>Build reusable list item component</li>
          <li>Write one integration test</li>
          <li>Refactor state updates to reducer</li>
        </ol>
      </article>
    );
  }
};

export default target;
