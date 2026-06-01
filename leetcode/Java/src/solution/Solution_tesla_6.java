package solution;

// split p get difference
public class Solution_tesla_6 {
    public int solution(int[] A) {
        int minimal = Integer.MAX_VALUE;
        int length = A.length;

        for (int i = 1; i < A.length; i++) {
            A[i] = A[i -1] + A[i];
        }

        for (int i = 0; i < A.length - 1; i++) {
            int currentDifference = Math.abs(2 * A[i] - A[length - 1]);
            if (currentDifference < minimal) {
                minimal = currentDifference;
            }
        }

        return minimal;
    }
}