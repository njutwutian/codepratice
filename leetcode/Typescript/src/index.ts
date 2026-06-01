import { runTwoSum, twoSumTestCases } from "../problems/two-sum";

const main = (): void => {
  const problemRunners: Record<string, () => unknown> = {
    "two-sum": () => runTwoSum(twoSumTestCases[0])
  };

  const inputProblemName = process.argv[2] ?? "two-sum";
  const runner = problemRunners[inputProblemName];

  if (!runner) {
    const availableProblems = Object.keys(problemRunners).join(", ");
    console.error(`Unknown problem: ${inputProblemName}`);
    console.error(`Available problems: ${availableProblems}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Running problem: ${inputProblemName}`);
  runner();
};

main();
