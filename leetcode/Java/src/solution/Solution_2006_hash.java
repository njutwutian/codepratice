package solution;

import java.util.HashMap;

public class Solution_2006_hash {
    public int countKDifference(int[] nums, int k) {
        if (k < 0) {
            return 0;
        }
        int count = 0;
        HashMap<Integer, Integer> hashMap = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums.length; i++) {
            if (hashMap.containsKey(nums[i] + k)) {
                count = count + hashMap.get(nums[i] + k);
            }
            if (hashMap.containsKey(nums[i] - k)) {
                count = count + hashMap.get(nums[i] - k);
            }
            hashMap.put(nums[i], hashMap.containsKey(nums[i]) ? hashMap.get(nums[i]) + 1 : 1);
        }

        // System.out.println("===========");
        // for (Map.Entry<Integer,Integer> entry : hashMap.entrySet()) {
        // System.out.println("key=" + entry.getKey() + "value=" + entry.getValue());
        // }
        // System.out.println("===========");

        return count;
    }
}
