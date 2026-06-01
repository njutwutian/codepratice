import type { MockTargetDefinition } from "../mockTargets";

const target: MockTargetDefinition = {
  id: "order-panel",
  title: "Mock Order Panel",
  description: "Commerce style panel with metrics and status fields.",
  Component: () => {
    return (
      <article className="mock-card order-card">
        <header>
          <p className="chip">Order Summary</p>
          <h3>Order #A90231</h3>
        </header>
        <div className="metric-grid">
          <div>
            <span className="label">Items</span>
            <strong>4</strong>
          </div>
          <div>
            <span className="label">Amount</span>
            <strong>CNY 328.50</strong>
          </div>
          <div>
            <span className="label">Status</span>
            <strong>Shipping</strong>
          </div>
          <div>
            <span className="label">ETA</span>
            <strong>2 days</strong>
          </div>
        </div>
      </article>
    );
  }
};

export default target;
