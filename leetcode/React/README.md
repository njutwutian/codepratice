# React Mock Practice

This project is a React + TypeScript practice lab. The home page lets you choose a mock child component and preview it instantly.

## Run

```bash
npm install
npm run dev
```

## Add A New Mock Target

1. Create a new file under `src/mocks/` with suffix `.mock.tsx`.
2. Export a default object that matches `MockTargetDefinition` from `src/mockTargets.tsx`.
3. Save the file; the home page menu updates automatically.

Example:

```tsx
import type { MockTargetDefinition } from "../mockTargets";

const target: MockTargetDefinition = {
  id: "sample-card",
  title: "Sample Card",
  description: "My own mock component",
  Component: () => <div>hello</div>
};

export default target;
```

## Current Structure

- `src/App.tsx`: home page with selector and preview canvas
- `src/mockTargets.tsx`: auto-discovery registry using `import.meta.glob`
- `src/mocks/*.mock.tsx`: each mock child component target
