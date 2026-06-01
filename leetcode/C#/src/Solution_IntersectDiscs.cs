namespace Leetcode.CSharp
{
    public class Solution_IntersectDiscs
    {
        public int solution(int[] A)
        {
            int result = 0;
            int length = A.Length;
            for (int i = 0; i < length-1; i++)
            {
                for (int j = i + 1; j < length; j++)
                {
                    if ((j - A[j] >= i - A[i] && j - i - A[j] <= A[i]) ||
                        (j - A[j] <= i - A[i] && j - i >= A[i] - A[j])||
                        (j - A[j] >= i - A[i] && j - i <= A[i] - A[j])) {
                            result++;
                    }
                    if (result > 10000000) {
                        return -1;
                    }
                }
            }

            return result;
        }
    }
}