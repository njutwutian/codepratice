package solution;

// 夏日炎炎，小男孩 Tony 想买一些雪糕消消暑。
// 商店中新到 n 支雪糕，用长度为 n 的数组 costs 表示雪糕的定价，其中 costs[i] 表示第 i 支雪糕的现金价格。Tony 一共有 coins 现金可以用于消费，他想要买尽可能多的雪糕。
// 给你价格数组 costs 和现金量 coins ，请你计算并返回 Tony 用 coins 现金能够买到的雪糕的 最大数量 。
// 注意：Tony 可以按任意顺序购买雪糕。

// 示例 1：
// 输入：costs = [1,3,2,4,1], coins = 7
// 输出：4
// 解释：Tony 可以买下标为 0、1、2、4 的雪糕，总价为 1 + 3 + 2 + 1 = 7
// 示例 2：
// 输入：costs = [10,6,8,7,7,8], coins = 5
// 输出：0
// 解释：Tony 没有足够的钱买任何一支雪糕。
// 示例 3：
// 输入：costs = [1,6,3,1,2,5], coins = 20
// 输出：6
// 解释：Tony 可以买下所有的雪糕，总价为 1 + 6 + 3 + 1 + 2 + 5 = 18 。

// 提示：
// costs.length == n
// 1 <= n <= 10^5
// 1 <= costs[i] <= 10^5
// 1 <= coins <= 10^8
public class Solution_1833_v2 {
    public int maxIceCream(int[] costs, int coins) {
        int result = 0;
        int [] sorted = sortArrayIncrement(costs, 0, costs.length -1);
        for (int i = 0; i < sorted.length; i++) {
            if (coins - sorted[i] >= 0) {
                coins -= sorted[i];
                result++;
            }
        }
        return result;
    }

    
    public int[] sortArrayIncrement(int[] array, int start, int end) {
        if (start == end) {
            return new int[] {array[start]};
        }
        if (end - start == 1) {
            if (array[start] < array[end]) {
                return new int[] {array[start], array[end]};
            } else {
                return new int[] {array[end], array[start]};
            }
        }
        int mid = (start + end) / 2; // 0 1 2 mid 1; 0 1 2 3 mid 1 ; 0 1 mid 0
        return combineArrays(sortArrayIncrement(array, start, mid), sortArrayIncrement(array, mid + 1, end) ); 
    }

    public int[] combineArrays(int[] a, int[] b) {
        int[] result = new int[a.length+b.length];
        int aIndex = 0;
        int bIndex = 0;
        for (int i = 0; i < result.length; i++) {
            int temp = 0;
            if (aIndex < a.length && bIndex < b.length){
                if (b[bIndex] >= a[aIndex]) {
                    temp = a[aIndex];
                    aIndex++;
                } else {
                    temp = b[bIndex];
                    bIndex++; 
                } 
            } else if (aIndex >= a.length && bIndex < b.length) {
                temp = b[bIndex];
                bIndex++; 
            } else if (bIndex >= b.length && aIndex < a.length) {
                temp = a[aIndex];
                aIndex++; 
            }
            result[i] = temp;
        }
        return result;
    }
}

// 执行用时：
// 82 ms
// , 在所有 Java 提交中击败了
// 5.10%
// 的用户
// 内存消耗：
// 54.9 MB
// , 在所有 Java 提交中击败了
// 73.41%
// 的用户