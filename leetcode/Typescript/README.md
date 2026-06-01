# TypeScript LeetCode Practice

## Quick Start

```bash
npm install
npm run dev
npm run dev -- two-sum
```

## Common Commands

- `npm run dev`: run default problem in `src/index.ts`
- `npm run dev -- <problem-name>`: run selected problem from registry
- `npm run new -- <problem-name>`: create a new problem file in `problems/`
- `npm run check`: TypeScript type check only
- `npm run build`: compile to `dist/`
- `npm run start`: run compiled JavaScript

## Suggested Workflow

1. Run `npm run new -- two-sum` to generate a new file.
2. Implement logic in the generated file with 3 sections:
	- source code
	- test parameters
	- run function
3. Register your runner in `src/index.ts`, then run `npm run dev -- <problem-name>`.
4. Run `npm run check` before commit.

## Template

- `problems/_template.ts`: reference template with arrow-function style.
