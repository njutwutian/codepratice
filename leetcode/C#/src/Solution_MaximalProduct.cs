namespace Leetcode.CSharp
{
    // urgly
    public class Solution_MaximalProduct
    {
        public int solution(int[] A)
        {
            int result = 0;
            int length = A.Length;
            Array.Sort(A);

            if (A.Length == 3) {
                return A[0] *A[1]*A[2];
            } else {
                if (A[0] >= 0) {
                    return A[length -1] * A[length -2] * A[length -3];
                } else {
                    result = A[length -1] * A[length -2] * A[length -3];
                    result = result > A[length -1] * A[length -2] * A[0] ? result : A[length -1] * A[length -2] * A[0];
                    result = result > A[length -1] * A[0] * A[1] ? result : A[length -1] * A[0] * A[1] ;
                    result = result > A[0] * A[1] * A[2] ? result : A[0] * A[1] * A[2] ;
                }
            }

            return result;
        }
    }
}