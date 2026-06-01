namespace Leetcode.CSharp
{
    public class Solution_Mod_improve
    {
        public int solution(int A, int B, int K)
        {
            int result = 0;
            int startIndex = A;
            int mod = startIndex % K;
            if (mod == 0) {
                result = (B-A)/K + 1;
            } else {
                startIndex = startIndex + K - mod;
                if (startIndex <= B) {
                    result = (B - startIndex) / K + 1;
                }
            }
            return result;
        }
    }
}