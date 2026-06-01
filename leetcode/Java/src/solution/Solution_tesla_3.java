package solution;

// Frog jump
public class Solution_tesla_3 {
    public int solution(int X, int Y, int D) {
        int steps = 0;

        while (X < Y) {
            steps++;
            X = X + D;
        }

        return steps;
    }
}