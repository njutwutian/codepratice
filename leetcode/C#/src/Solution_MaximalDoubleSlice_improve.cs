namespace Leetcode.CSharp
{
    public class Solution_MaximalDoubleSlice_improve
    {
        public int solution(int[] A)
        {
            int maxResult = 0;
            int length = A.Length;
            int[] maxLeft = new int[length];
            int[] maxRight = new int[length];

            for (int i = 2; i < length - 1; i++)
            {
                maxLeft[i] = Math.Max(maxLeft[i-1] + A[i - 1], 0);
            }

            for (int i = length - 3; i > 0 ; i--)
            {
                maxRight[i] = Math.Max(maxRight[i + 1] + A[i + 1], 0); 
            }

            for (int i = 1; i < length - 1; i++)
            {
                int temp = maxLeft[i] + maxRight[i];
                if (temp > maxResult) {
                    maxResult = temp;
                }
            }

            return maxResult;
        }
    }
}