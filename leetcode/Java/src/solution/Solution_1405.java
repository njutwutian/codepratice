package solution;

public class Solution_1405 {
    public String longestDiverseString(int a, int b, int c) {
        String result = "";



        return result;
    }

    public String append(String origin, String lastTwo, int a, int b, int c) {
        if (a >= b && a >= c) {
            if (lastTwo == "aa") {
                if (b >= c) {
                    origin = origin + "b";
                    b--;
                    lastTwo = getNewLastTwo(lastTwo, "b");
                } else {
                    origin = origin + "c";
                    c--;
                    lastTwo = getNewLastTwo(lastTwo, "c");
                }
            } else {
                origin = origin + "a";
                a--;
                lastTwo = getNewLastTwo(lastTwo, "a");
            }
        } else if (b >= a && b >= c) {
            if (lastTwo == "bb") {
                if (a >= c) {
                    origin = origin + "a";
                    a--;
                    lastTwo = getNewLastTwo(lastTwo, "a");
                } else {
                    origin = origin + "c";
                    c--;
                    lastTwo = getNewLastTwo(lastTwo, "c");
                }
            } else {
                origin = origin + "b";
                b--;
                lastTwo = getNewLastTwo(lastTwo, "b");
            }
        } else {
            if (lastTwo == "cc") {
                if (b >= a) {
                    origin = origin + "b";
                    b--;
                    lastTwo = getNewLastTwo(lastTwo, "b");
                } else {
                    origin = origin + "a";
                    a--;
                    lastTwo = getNewLastTwo(lastTwo, "a");
                }
            } else {
                origin = origin + "c";
                c--;
                lastTwo = getNewLastTwo(lastTwo, "c");
            }
        }
        return "";
    }

    public String getNewLastTwo(String lastTwo, String appendChar) {
        if (lastTwo.length() == 2) {
            return (lastTwo + appendChar).substring(1);
        } else {
            return lastTwo + appendChar;
        }
    }
}
