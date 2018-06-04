/*
 给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。
 
 字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。
 
 说明：
 
 字母异位词指字母相同，但排列不同的字符串。
 不考虑答案输出的顺序。
 示例 1:
 
 输入:
 s: "cbaebabacd" p: "abc"
 
 输出:
 [0, 6]
 
 解释:
 起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
 起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
 示例 2:
 
 输入:
 s: "abab" p: "ab"
 
 输出:
 [0, 1, 2]
 
 解释:
 起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
 起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
 起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
 */
import Foundation

// 思路 主要是 先把第一次的string 放入字典，然后位移加减字典字符如果count = 0 说明正好一样ps：最后还是超时了。 
class Solution {
    func findAnagrams(_ s: String, _ p: String) -> [Int] {
        guard s.count >= p.count else {
            return []
        }
        var originalDic: [Character:Int] = [:]
        var reslut: [Int] = []
        for char in p {
            originalDic[char] = 1 + (originalDic[char] ?? 0)
        }
        
        var charArray: [Character] = []
        for char in s {
            charArray.append(char)
        }
        var count = p.count
        for index in 0...(s.count - 1) {
            let char = charArray[index]
            let num = (originalDic[char] ?? 0) - 1
            count = num >= 0 ? count - 1 : count + 1
            originalDic[char] = num
            if index >= p.count {
                let char = charArray[index - p.count]
                let num = (originalDic[char] ?? 0) + 1
                count = num <= 0 ? count - 1 : count + 1
                originalDic[char] = num
            }
            if count == 0 {
                reslut.append(index - p.count + 1)
            }
        }
        return reslut
    }
}
