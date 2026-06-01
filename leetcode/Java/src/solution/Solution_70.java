package solution;

public class Solution_70 {
    public int climbStairs(int n) {
        int prepre = 0;
        int pre = 1;
        int current = 1;
        for (int i = 1; i < n + 1; i++) {
            current = pre + prepre;
            prepre = pre;
            pre = current;
        }
        return current;
    }
}