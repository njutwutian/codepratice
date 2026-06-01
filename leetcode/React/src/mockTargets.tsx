import type { ComponentType, ReactElement } from "react";

export type MockTarget = {
  id: string;
  title: string;
  description: string;
  render: () => ReactElement;
};

export type MockTargetDefinition = {
  id: string;
  title: string;
  description: string;
  Component: ComponentType;
};

type MockTargetModule = {
  default: MockTargetDefinition;
};

const modules = import.meta.glob("./mocks/*.mock.tsx", {
  eager: true
}) as Record<string, MockTargetModule>;

const discoveredTargets = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => a.title.localeCompare(b.title));

const toRuntimeTarget = (target: MockTargetDefinition): MockTarget => {
  return {
    id: target.id,
    title: target.title,
    description: target.description,
    render: () => <target.Component />
  };
};

const emptyStateTarget: MockTarget = {
  id: "empty",
  title: "No Mock Target Found",
  description: "Add a .mock.tsx file in src/mocks to start practicing.",
  render: () => (
    <article className="mock-card">
      <header>
        <p className="chip">Empty</p>
        <h3>No component available</h3>
      </header>
      <p>Create your first target under src/mocks/*.mock.tsx.</p>
    </article>
  )
};

export const mockTargets: MockTarget[] =
  discoveredTargets.length > 0
    ? discoveredTargets.map(toRuntimeTarget)
    : [emptyStateTarget];
