import type { MockTargetDefinition } from "../mockTargets";

const target: MockTargetDefinition = {
  id: "user-profile",
  title: "Mock User Profile",
  description: "Card layout with profile data and metadata list.",
  Component: () => {
    return (
      <article className="mock-card user-card">
        <header>
          <p className="chip">User Profile</p>
          <h3>Tian</h3>
        </header>
        <p>Frontend engineer who likes data dashboards and keyboard shortcuts.</p>
        <ul>
          <li>Followers: 1280</li>
          <li>Repos: 42</li>
          <li>Location: Hangzhou</li>
        </ul>
      </article>
    );
  }
};

export default target;
