package solution;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

// 给你一个整数数组 nums 。
// 如果一组数字 (i,j) 满足 nums[i] == nums[j] 且 i < j ，就可以认为这是一组 好数对 。
// 返回好数对的数目。


// 示例 1：
// 输入：nums = [1,2,3,1,1,3]
// 输出：4
// 解释：有 4 组好数对，分别是 (0,3), (0,4), (3,4), (2,5) ，下标从 0 开始
// 示例 2：

// 输入：nums = [1,1,1,1]
// 输出：6
// 解释：数组中的每组数字都是好数对
// 示例 3：

// 输入：nums = [1,2,3]
// 输出：0

// 提示：
// 1 <= nums.length <= 100
// 1 <= nums[i] <= 100

// 1、 A(n,m）=n（n-1）（n-2）......（n-m+1）=n！/（n-m）！
// 2、C（n，m）=A(n,m）/m！=n！/(m！（n-m）！)


public class Solution_1512_lose {
    public int numIdenticalPairs(int[] nums) {
        int result = 0;
        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
        for (int i = 0; i< nums.length; i++) {
            if (map.containsKey(nums[i])) {
                map.put(nums[i], map.get(nums[i]) + 1); 
            } else {
                map.put(nums[i], 1); 
            }
        }


        Iterator it = map.entrySet().iterator();
        while(it.hasNext()) {
            Map.Entry<Integer,Integer> entry = (Map.Entry<Integer,Integer>)it.next();
            if (entry.getValue() > 1) {
                result += select(entry.getValue());
            }
        }
        return result;
    }

    public int xNumber(int number) {
        return number == 1 ? 1 : number* xNumber(number -1); 
    }

    public int select(int n) {
        return n == 2 ? 1 : (int) (xNumber(n) / (2 * xNumber(n-2)));
    }
}
