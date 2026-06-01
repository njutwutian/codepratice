package solution;

import java.util.HashMap;
import java.util.Map;

// paired number
public class Solution_tesla_4 {
    public int solution(int[] A) {
        int result = 0;
        HashMap<Integer, Boolean> map = new HashMap<Integer, Boolean>();
        for (int i = 0; i < A.length; i++) {
            if (map.containsKey(A[i])) {
                map.remove(A[i]);
            } else {
                map.put(A[i], true);
            }
        }
        for (Map.Entry<Integer, Boolean> entry: map.entrySet()) {
            result = entry.getKey();
        }
        return result;
    }
}