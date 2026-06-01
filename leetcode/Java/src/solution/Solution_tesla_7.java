package solution;

// N counters get result for operations array of M counts
public class Solution_tesla_7 {
    public int[] solution(int N, int[] A) {
        int[] result = new int[N];

        int currentMaxCounter = 0;
        for (int i = 0; i < A.length; i++) {
            if (A[i] < N+1) {
                result[A[i] - 1]++;
                if (currentMaxCounter < result[A[i] - 1]) {
                    currentMaxCounter = result[A[i] - 1];
                }
            } else {
                for (int j = 0; j < N; j++) {
                    result[j] = currentMaxCounter;
                }
            }
        }

        return result;
    }
}