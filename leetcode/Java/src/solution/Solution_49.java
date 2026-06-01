package solution;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

// 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。

//  

// 示例 1:

// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
// 示例 2:

// 输入: strs = [""]
// 输出: [[""]]
// 示例 3:

// 输入: strs = ["a"]
// 输出: [["a"]]
//  

// 提示：

// 1 <= strs.length <= 104
// 0 <= strs[i].length <= 100
// strs[i] 仅包含小写字母

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/group-anagrams
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

public class Solution_49 {
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> result = new ArrayList<List<String>>();
        Map<String, List<String>> map = new HashMap<String, List<String>>();
        for (int i = 0; i < strs.length; i++) {
            String tempKey="";
            if (strs[i].length() > 0) {
                char[] tempArray = strs[i].toCharArray();
                Arrays.sort(tempArray);
                tempKey = String.valueOf(tempArray);
            }
            List<String> tempValueList = new ArrayList<String>();
            if (map.containsKey(tempKey)) {
                tempValueList = map.get(tempKey);
            }
            tempValueList.add(strs[i]);
            map.put(tempKey, tempValueList);
        }

        for (Map.Entry<String, List<String>> entry : map.entrySet()) {
            result.add(entry.getValue());
        }

        return result;
    }
}