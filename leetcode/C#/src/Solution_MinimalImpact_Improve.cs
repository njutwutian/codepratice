namespace Leetcode.CSharp
{
    public class Solution_MinimalImpact_Improve
    {
        public int[] solution(string S , int[] P, int[] Q)
        {
            int [] result = new int[P.Length];
            int [] A = new int[S.Length];
            int [] C = new int[S.Length];
            int [] G = new int[S.Length];
            int [] T = new int[S.Length];
            char [] charsOfS = S.ToCharArray();
            for (int i = 0; i < S.Length; i++)
            {
                switch (charsOfS[i])
                {
                    case 'A':
                        A[i] = i > 0 ? A[i - 1] + 1 : 1;
                        C[i] = i > 0 ? C[i - 1] : 0;
                        G[i] = i > 0 ? G[i - 1] : 0;
                        T[i] = i > 0 ? T[i - 1] : 0;
                        break;
                    case 'C':
                        C[i] = i > 0 ? C[i - 1] + 1 : 1;
                        A[i] = i > 0 ? A[i - 1] : 0;
                        G[i] = i > 0 ? G[i - 1] : 0;
                        T[i] = i > 0 ? T[i - 1] : 0;
                        break;
                    case 'G':
                        G[i] = i > 0 ? G[i - 1] + 1 : 1;
                        A[i] = i > 0 ? A[i - 1] : 0;
                        C[i] = i > 0 ? C[i - 1] : 0;
                        T[i] = i > 0 ? T[i - 1] : 0;
                        break;
                    case 'T':
                        T[i] = i > 0 ? T[i - 1] + 1 : 1;
                        A[i] = i > 0 ? A[i - 1] : 0;
                        C[i] = i > 0 ? C[i - 1] : 0;
                        G[i] = i > 0 ? G[i - 1] : 0;
                        break;
                    default:
                        break;
                }
            }

            int length = P.Length;

            for (int i = 0; i < length; i++)
            {
                if (P[i] > 0)
                {
                    if (A[Q[i]] > A[P[i] - 1])
                    {
                        result[i] = 1;
                    }
                    else if (C[Q[i]] > C[P[i] - 1])
                    {
                        result[i] = 2;
                    }
                    else if (G[Q[i]] > G[P[i] - 1])
                    {
                        result[i] = 3;
                    }
                    else
                    {
                        result[i] = 4;
                    }
                }
                else
                {
                    if (A[Q[i]] > 0)
                    {
                        result[i] = 1;
                    }
                    else if (C[Q[i]] > 0)
                    {
                        result[i] = 2;
                    }
                    else if (G[Q[i]] > 0)
                    {
                        result[i] = 3;
                    }
                    else
                    {
                        result[i] = 4;
                    }
                }
            }

            return result;
        }
    }
}