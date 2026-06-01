package solution;
import java.util.HashMap;

public class Solution_461 {
    public int totalHammingDistance(int[] nums) {
        int result = 0;
        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums.length-1; i++) {
            for (int j = i+1; j < nums.length; j++) {
                int element = nums[i] ^ nums[j];
                int tempResult = 0;
                if (map.containsKey(element)) {
                    tempResult = map.get(element);
                } else {
                    tempResult = hammingDistance(element);
                    map.put(element, tempResult);
                }
                result += tempResult;
            }
        }
        return result;
    }

    public int hammingDistance(int result) {
        int count = 0;
        while (result > 0) {
            count += result & 1;
            result >>= 1;
        }
        return count;
    };
}
