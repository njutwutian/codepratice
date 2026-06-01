package solution;
// Longest gap in the binary positive integer number
// System.out.println(Integer.parseInt("1111111111111111111111111111110",2));
// System.out.println(new Solution_tesla_1().solution(2147483646));
// System.out.println(Integer.parseInt("1111111111111111111111111111101",2));
// System.out.println(new Solution_tesla_1().solution(2147483645));
public class Solution_tesla_1 {
    public int solution(int N) {
        int longestGap = 0;
        int currentGap = 0;
        String binaryString = Integer.toBinaryString(N);
        System.out.println(binaryString);
        boolean hasPrefixZero = false;
        for (int i = 0; i < binaryString.length(); i++) {
            char tempChar = binaryString.charAt(i);
            if (tempChar == '1' && hasPrefixZero) {
                hasPrefixZero = false;
                if (currentGap > longestGap) {
                    longestGap = currentGap;
                }
                currentGap = 0;
            } else if (tempChar == '0') {
                hasPrefixZero = true;
                currentGap++;
            }
        }

        return longestGap;
    }
}