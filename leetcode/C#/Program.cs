using System;

namespace Leetcode.CSharp
{
    class Program
    {
        public static void Main(string[] args)
        {
            // Console.WriteLine(new Solution_MinimalImpact().solution("CAGCCTA", new int[] {2,5,0}, new int[] {4,5,6}));
            printArray(new Solution_MinimalImpact_Improve().solution("CAGCCTA", new int[] {2,5,0}, new int[] {4,5,6}));
            Console.WriteLine("Hello World!");
        }

        public static void printArray(int[] printArray)
        {
            Console.WriteLine("=================");
            for (int i = 0; i < printArray.Length; i++)
            {
                Console.WriteLine(printArray[i] + " ");
            }
            Console.WriteLine("=================");
        }
    }
}