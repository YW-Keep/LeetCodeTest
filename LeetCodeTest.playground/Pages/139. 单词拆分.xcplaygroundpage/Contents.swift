/*
 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
 
 说明：
 
 拆分时可以重复使用字典中的单词。
 你可以假设字典中没有重复的单词。
 示例 1：
 
 输入: s = "leetcode", wordDict = ["leet", "code"]
 输出: true
 解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
 示例 2：
 
 输入: s = "applepenapple", wordDict = ["apple", "pen"]
 输出: true
 解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
 注意你可以重复使用字典中的单词。
 示例 3：
 
 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 输出: false
 */
// 思路：动态规划，已知一个字符串可以被分割，加上一个能分割的字符串 整个字符串肯定能被分割
import Foundation
class Solution {
    func wordBreak(_ s: String, _ wordDict: [String]) -> Bool {
        
        guard s.count > 0 else {
            return true
        }
        
        var canBreak = Array(repeating: false, count: s.count + 1)
        canBreak[0] = true
        for i in 1...s.count {
            var j = i - 1
            while j >= 0 {
                if canBreak[j] {
                    let start = s.index(s.startIndex, offsetBy: j)
                    let end = s.index(s.startIndex, offsetBy: i - 1)
                    let indexStr = String(s[start...end])
                    if wordDict.contains(indexStr) {
                        canBreak[i] = true
                        break
                    }
                }
                j -= 1
            }
        }
        return canBreak[s.count]
    }
}
