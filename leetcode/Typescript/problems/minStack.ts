// Problem: minStack
// export type MinStackTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
class MinStack {
    private stack: number[];
    private minStack: number[];
    private length: number;
    constructor() {
        this.stack = [];
        this.minStack = [];
        this.length = 0;
    }

    push(value: number): void {
        this.stack.push(value);
        if (this.minStack.length === 0 || value <= this.minStack[this.minStack.length - 1]) {
          this.minStack.push(value);
        }
        this.length++;
    }

    pop(): void {
        const value = this.stack.pop();
        this.length--;
        if (this.minStack[this.minStack.length - 1] === value) {
          this.minStack.pop();
        }
    }

    top(): number {
        return this.stack[this.length - 1];
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(value)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

// 2) Configure test parameters
// export const minStackTestCases: MinStackTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runMinStack = (
//   testCase: MinStackTestCase = minStackTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = minStack(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
