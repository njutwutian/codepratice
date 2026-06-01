namespace Leetcode.CSharp
{
    public class Solution_MinimalImpact
    {
        public int[] solution(string S , int[] P, int[] Q)
        {
            int [] result = new int[P.Length];
            int length = P.Length;

            for (int i = 0; i < length; i++)
            {
                string temp = S.Substring(P[i], Q[i] - P[i]);
                if (temp.IndexOf("A") > -1) {
                    result[i] = 1;
                } else if (temp.IndexOf("C") > -1) {
                    result[i] = 2;
                } else if (temp.IndexOf("G") > -1) {
                    result[i] = 3;
                } else {
                    result[i] = 4;
                }
            }

            return result;
        }
    }
}