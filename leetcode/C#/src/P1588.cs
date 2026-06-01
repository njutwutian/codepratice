using System;

namespace Leetcode.CSharp
{
    public class SolutionP1588
    {
        // public int SumOddLengthSubarrays_obsolete(int[] arr)
        // {
        //     if (arr.Length == 0)
        //         return 0;
        //     int length = 1;
        //     int sum = 0;
        //     while (length <= arr.Length)
        //     {
        //         int index = 0;
        //         while (index + length <= arr.Length)
        //         {
        //             for (int i = index; i < index + length; i++)
        //             {
        //                 sum += arr[i];
        //             }
        //         }
        //         length = length + 2;
        //     }
        //     return sum;
        // }

        // public int SumOddLengthSubarrays(int[] arr)
        // {
        //     return SumOddLengthSubarrays(arr, 0, arr.Length - 1);
        // }

        // public int SumOddLengthSubarrays(int[] arr, int startIndex, int endIndex)
        // {
        //     int currentLength = endIndex - startIndex + 1;
        //     if (currentLength < 0)
        //     {
        //         return 0;
        //     }
        //     int sum = 0;
        //     int subLength = currentLength - 2;
        //     if (currentLength % 2 != 0)
        //     {
        //         for (int i = startIndex; i < endIndex + 1; i++)
        //         {
        //             sum += arr[i];
        //         }
        //         if (currentLength > 1 && currentLength = arr.Length)
        //         {
        //             sum = 2 * sum;
        //         }
        //         if (currentLength == 1)
        //         {
        //             return 0;
        //         }
        //         else
        //         {
        //             for (int i = startIndex; i + subLength < currentLength + 1; i++)
        //             {
        //                 sum += SumOddLengthSubarrays(arr, i, i + subLength - 1);
        //             }
        //             return sum;
        //         }
        //     }
        //     else
        //     {
        //         subLength = currentLength - 1;
        //         for (int i = startIndex; i + subLength < currentLength + 1; i++)
        //         {
        //             sum += SumOddLengthSubarrays(arr, i, i + subLength - 1);
        //         }
        //         return sum;
        //     }
        // }
    }
}