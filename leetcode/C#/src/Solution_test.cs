namespace Leetcode.CSharp
{
    public class Solution_test
    {
        public Solution_test()
        {
            List<Student> studentList = new List<Student>()
            {
                new Student(){ID = 1, Name = "James", Gender = "Male"},
                new Student(){ID = 2, Name = "Sara", Gender = "Female"},
                new Student(){ID = 3, Name = "Steve", Gender = "Male"},
                new Student(){ID = 4, Name = "Pam", Gender = "Female"}
            };

            Console.ReadKey();
        }
    }
    public class Student
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
    }
}