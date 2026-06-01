import java.util.Arrays;

import solution.*;

public class App {
    public static void main(String[] args) throws Exception {
        // Solution_49 test = new Solution_49();
        // System.out.println(test.groupAnagrams(new String[] {"","c","", "a", "b", "a", "eat", "tea", "tan", "ate", "nat", "bat"}));
        // char[] array = new char[26];
        // for (int i = 0; i < 26; i++) {
        //     int temp = 97 + i;
        //     array[i] = (char) temp;
        // }
        // System.out.println(new Solution_tesla_6().solution(new int[]{1,1}));
        printArray(new Solution_tesla_7_improve().solution(5, new int[]{1}));
        printArray(new Solution_tesla_7_improve().solution(5, new int[]{6}));
        printArray(new Solution_tesla_7_improve().solution(5, new int[]{3,4,4,6,1,4,4}));
        printArray(new Solution_tesla_7_improve().solution(5, new int[]{3,6,6,6,1,6,4}));
        printArray(new Solution_tesla_7_improve().solution(5, new int[]{1,1,1,1,1,1,1}));
        printArray(new Solution_tesla_7_improve().solution(5, new int[]{6,6,6,6,1,1,6}));
        printArray(new Solution_tesla_7_improve().solution(5, new int[]{6,6,6,6,1,4,6}));
        System.out.println("Hello, World!");
    }

    public static void printArray(int[] printArray) {
        System.out.println("=================");
        for (int i = 0; i < printArray.length; i++) {
            System.out.print(printArray[i] + " ");
        }
        System.out.println("");
        System.out.println("=================");
    }
}
