package solution;

import java.util.Arrays;

// missing number
public class Solution_tesla_5 {
    public int solution(int[] A) {
        int result = A.length + 1;
        Arrays.sort(A);
        for (int i = 0; i < A.length; i++) {
            int temp = i + 1;
            if (temp !=  A[i]) {
                return temp; 
            }
        }
        return result;
    }
}