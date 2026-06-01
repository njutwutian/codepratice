namespace Leetcode.CSharp
{
    public class Solution_Frog
    {
        public int solution(int X, int Y, int D)
        {
            int steps = 0;

            if (X < Y) {
                return (Y-X) % D > 0 ? ((Y-X) / D) + 1 : (Y-X) / D;
            } else {
                return steps;
            }
        }
    }
}