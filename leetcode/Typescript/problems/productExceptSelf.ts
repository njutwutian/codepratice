// Problem: productExceptSelf
// export type ProductExceptSelfTestCase = {
//   input: {
//     nums: number[];
//     target: number;
//   };
//   expected: [number, number];
// };

// 1) Source code
export const productExceptSelf = (nums: number[]): number[] => {
  let product = 1;
  let noZeroProduct = 1;
  let zeroCount = 0;
  let zeroIndex = -1;
  nums.forEach((x, index) => {
    if (x === 0) {
      zeroCount += 1;
      if (zeroCount === 1) {
        zeroIndex = index;
      }
    } else {
      noZeroProduct *= x;
    }
    product *= x;
  });
  if (product === 0) {
    if (zeroCount > 1) {
      return new Array(nums.length).fill(0);
    } else {
      let result = new Array(nums.length).fill(0);
      result[zeroIndex] = noZeroProduct;
      return result;
    }
  } else {
    let result = new Array(nums.length);
    nums.forEach((x, index) => {
      result[index] = divideSimple(product, x);
    });
    return result;
  }
};

function divideSimple(dividend: number, divisor: number): number {
  if (divisor === 0) {
    throw new Error("除数不能为零");
  }

  const sign = ((dividend ^ divisor) >> 31) & 1;
  let uDividend = Math.abs(dividend);
  let uDivisor = Math.abs(divisor);

  if (uDividend < uDivisor) {
    return 0;
  }

  let quotient = 0;
  let remainder = 0;

  // 假设处理 32 位整数（从第 31 位到第 0 位）
  for (let i = 31; i >= 0; i--) {
    // 余数左移一位，腾出空间给被除数的下一位
    remainder <<= 1;

    // 取出被除数的当前位（从高位到低位）
    const currentBit = (uDividend >> i) & 1;
    remainder |= currentBit;

    // 如果当前余数大于等于除数
    if (remainder >= uDivisor) {
      remainder -= uDivisor;
      quotient |= (1 << i);  // 商的对应位置 1
    }
    // 否则该位为 0，不需要操作
  }

  return sign ? -quotient : quotient;
}

// 2) Configure test parameters
// export const productExceptSelfTestCases: ProductExceptSelfTestCase[] = [
//   { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
// ];

// 3) Run function
// export const runProductExceptSelf = (
//   testCase: ProductExceptSelfTestCase = productExceptSelfTestCases[0]
// ): [number, number] => {
//   const { nums, target } = testCase.input;
//   const result = productExceptSelf(nums, target);

//   console.log("input:", testCase.input);
//   console.log("result:", result, "expected:", testCase.expected);

//   return result;
// };
