import fs from "node:fs";
import path from "node:path";

const [, , problemName] = process.argv;

if (!problemName) {
  console.error("Usage: npm run new -- <problem-name>");
  process.exit(1);
}

const rootDir = process.cwd();
const problemsDir = path.join(rootDir, "problems");
const targetFile = path.join(problemsDir, `${problemName}.ts`);

if (fs.existsSync(targetFile)) {
  console.error(`File already exists: ${targetFile}`);
  process.exit(1);
}

const content = `export type ${toPascalCase(problemName)}TestCase = {
  input: {
    nums: number[];
    target: number;
  };
  expected: [number, number];
};

// 1) Source code
export const ${toCamelCase(problemName)} = (nums: number[], target: number): [number, number] => {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i += 1) {
    const value = nums[i];
    const need = target - value;
    const matchIndex = seen.get(need);

    if (matchIndex !== undefined) {
      return [matchIndex, i];
    }

    seen.set(value, i);
  }

  throw new Error("No solution found");
};

// 2) Configure test parameters
export const ${toCamelCase(problemName)}TestCases: ${toPascalCase(problemName)}TestCase[] = [
  { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
];

// 3) Run function
export const run${toPascalCase(problemName)} = (
  testCase: ${toPascalCase(problemName)}TestCase = ${toCamelCase(problemName)}TestCases[0]
): [number, number] => {
  const { nums, target } = testCase.input;
  const result = ${toCamelCase(problemName)}(nums, target);

  console.log("input:", testCase.input);
  console.log("result:", result, "expected:", testCase.expected);

  return result;
};
`;

fs.mkdirSync(problemsDir, { recursive: true });
fs.writeFileSync(targetFile, content, "utf8");
console.log(`Created ${path.relative(rootDir, targetFile)}`);

function toPascalCase(value) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toCamelCase(value) {
  const pascal = toPascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
