namespace Leetcode.CSharp
{
    public class Solution_Mod
    {
        public int solution(int A, int B, int K)
        {
            int result = 0;
            int currentIndex = A;
            int mod = currentIndex % K;
            if (mod == 0) {
                result++;
            } else {
                currentIndex = currentIndex + K - mod;
                if (currentIndex <= B) {
                    result++;
                }
            }
            while (currentIndex <= B) {
                currentIndex = currentIndex + K;
                if (currentIndex <= B) {
                    result++;
                }
            }

            return result;
        }
    }
}