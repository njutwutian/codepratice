package solution;
// Rotate Array
public class Solution_tesla_2 {
    public int[] solution(int[] A, int K) {
        if (A.length == 0) {
            return A;
        }
        int realK = K % A.length;
        int[] result = new int[A.length];
        for (int i = A.length - 1; i > -1; i--) {
            if (i - A.length + realK > -1) {
                result[i - A.length + realK] = A[i];
            } else {
                result[i + realK] = A[i];
            }
        }
        return result;
    }
}