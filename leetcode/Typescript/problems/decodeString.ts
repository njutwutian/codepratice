// Problem: decodeString
// export type DecodeStringTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const decodeString = (s: string): string => {
  let aCode = "az[]".charCodeAt(0);
  let zCode = "az[]".charCodeAt(1);
  let leftCode = "az[]".charCodeAt(2);
  let rightCode = "az[]".charCodeAt(3);

  let stack: any[] = [];
  let numberStack = "";
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    if (code >= aCode && code <= zCode) {
      stack.push(s[i]);
    } else if (code === leftCode){
      const num = Number(numberStack);
      numberStack = "";
      stack.push(num);
      stack.push("[");
    } else if (code === rightCode) {
      let temp = "";
      let sum = "";
      let current = stack.pop();
      while (current !== "[") {
        temp = current + temp;
        current = stack.pop();
      }
      const tempCount = Number(stack.pop());
      for (let j = 0; j< tempCount; j++) {
        sum += temp;
      }
      stack.push(sum);
      
    } else {
      numberStack += s[i];
    }
  }
  return stack.join("");
};

console.log(decodeString("3[a2[c]]"));
console.log(decodeString("3[a]2[bc]"));
console.log(decodeString("2[abc]3[cd]ef"));

// 2) Configure test parameters
// export const decodeStringTestCases: DecodeStringTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runDecodeString = (
//   testCase: DecodeStringTestCase = decodeStringTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = decodeString(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
