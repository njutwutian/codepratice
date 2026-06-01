namespace Leetcode.CSharp
{
    public class SolutionP1684
    {

        /**
        *Runtime: 124 ms, faster than 93.75% of C# online submissions for Count the Number of Consistent Strings.
        *Memory Usage: 37.5 MB, less than 83.22% of C# online submissions for Count the Number of Consistent Strings.
        **/
        public int CountConsistentStrings(string allowed, string[] words)
        {
            int result = 0;
            for (int i = 0; i < words.Length; i++)
            {
                string word = words[i];
                bool flag = true;
                for (int j = 0; j < word.Length; j++)
                {
                    if (allowed.IndexOf(word[j]) < 0)
                    {
                        flag = false;
                        break;
                    }
                }
                if (flag)
                {
                    result++;
                }
            }
            return result;
        }
    }
}