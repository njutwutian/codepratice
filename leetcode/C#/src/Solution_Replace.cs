namespace Leetcode.CSharp
{
// Example 1:
// In:
// A && B && C
// A => (E || F)
// C => (G || H)

// Out:
// (E || F) && B && (G || H)

// Example 2:
// In:
// A && ( AB ||  C ) && ABC
// A => (F || G)
// AB => (A && D)
// Out:
// (F || G) && ((A && D) || C) && ABC
    public class Solution_Replace
    {
        public string solution(string input, Dictionary<string, string> dic)
        {
            string result = "";
            string current = "";
            for (int i = 0; i < input.Length; i++)
            {
                char temp = input[i];
                if (temp == '&' || temp == '|') {
                    if (dic.ContainsKey(current)) {
                        result = result + dic[current];
                        current = "";
                    } else {
                        result = result + temp.ToString();
                    }
                } else {
                    if (temp != '(' && temp != ')' && temp.ToString().Trim().Length > 0) {
                        current = current + temp.ToString();
                    } else {
                        result = result + temp.ToString();
                    }
                }
            }
            return result;
        }
    }
}