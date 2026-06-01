package solution;

// N counters get result for operations array of M counts
public class Solution_tesla_7_improve {
    public int[] solution(int N, int[] A) {
        int[] result = new int[N];

        int currentMaxCounter = 0;
        boolean needResetALL = false;
        int resetALLMaxCounter = 0;
        for (int i = 0; i < A.length; i++) {
            if (A[i] < N+1) {
                if (needResetALL && result[A[i] -1] < resetALLMaxCounter) {
                    result[A[i] - 1] = resetALLMaxCounter + 1;
                } else {
                    result[A[i] - 1]++;
                }
                if (currentMaxCounter < result[A[i] - 1]) {
                    currentMaxCounter = result[A[i] - 1];
                }
            } else {
                needResetALL = true;
                resetALLMaxCounter = currentMaxCounter;
            }
        }

        for (int i = 0; i < result.length; i++) {
            if (needResetALL && resetALLMaxCounter > result[i]) {
                result[i] = resetALLMaxCounter;
            }
        }

        return result;
    }
}