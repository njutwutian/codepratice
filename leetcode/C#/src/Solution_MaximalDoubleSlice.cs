namespace Leetcode.CSharp
{
    public class Solution_MaximalDoubleSlice
    {
        public int solution(int[] A)
        {
            int maxResult = 0;
            int length = A.Length;
            int[] preSumArray = new int[length];
            int[] minimalArray = new int[length];
            preSumArray[0] = A[0];
            minimalArray[0] = A[0];

            for (int i = 1; i < length; i++)
            {
                preSumArray[i] = A[i] + preSumArray[i - 1];
            }

            for (int i = 0; i < length - 2; i++)
            {
                int tempSliceSum = A[i] + A[i + 1] + A[i + 2];
                for (int j = i + 2; j < length; j++)
                {
                    int minimalZ = A[i + 1];
                    for (int k = i + 1; k < j; k++)
                    {
                        if (A[k] < minimalZ)
                        {
                            minimalZ = A[k];
                        }
                    }
                    tempSliceSum = preSumArray[j] - preSumArray[i] - A[j] - minimalZ;
                    if (tempSliceSum > maxResult)
                    {
                        maxResult = tempSliceSum;
                    }
                }
            }

            return maxResult;
        }
    }
}