namespace Leetcode.CSharp
{
    public class Solution_1
    {        
        public int Validate(string[] args)
        {
            int result = 0;

            if (args.Length == 0) {
                return -1;
            }

            bool needCheckNameNext = false; 
            bool needCheckNumberNext = false; 
            for (int i = 0; i < args.Length; i++)
            {
                string temp = args[i].ToLower();
                if ("--help".Equals(temp)) {
                    if (!needCheckNameNext && !needCheckNumberNext) {
                        result = 1;
                    } else {
                        return -1;
                    }
                } else if ("--name".Equals(temp)) {
                    needCheckNameNext = true;
                } else if ("--count".Equals(temp)) {
                    needCheckNumberNext = true;
                } else if (needCheckNameNext) {
                    if (!CheckName(temp)) {
                        return -1;
                    } else {
                        needCheckNameNext = false;
                    }
                } else if (needCheckNumberNext) {
                    if (!CheckNumber(temp)) {
                        return -1;
                    } else {
                        needCheckNumberNext = false;
                    }
                } else {
                    return -1;
                }
            }

            if(needCheckNumberNext || needCheckNameNext){
                return -1;
            }

            return result;
        }

        public bool CheckName(string temp) {
            return temp.Length >= 3 && temp.Length <= 10;
        }

        public bool CheckNumber(string temp) {
            try
            {
                int number = Int32.Parse(temp);
                return number >= 10 && number <= 100;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
    }
}