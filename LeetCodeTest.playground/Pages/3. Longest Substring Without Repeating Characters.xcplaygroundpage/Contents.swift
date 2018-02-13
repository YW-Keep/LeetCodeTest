/*
 Given a string, find the length of the longest substring without repeating characters.
 
 Examples:
 
 Given "abcabcbb", the answer is "abc", which the length is 3.
 
 Given "bbbbb", the answer is "b", with the length of 1.
 
 Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
 */

import Foundation

class Solution {
    // 思路 遍历一次 记录初始点，所有Character结构体与字典  最长的长度，
    func lengthOfLongestSubstring(_ s: String) -> Int {
        var chars:  [Character] = []
        var dic: [Character: Int] = [:]
        var startNum = -1
        var maxLength = 0
        for (index, char) in s.enumerated() {
            if chars.contains(char) {
                startNum = dic[char]! > startNum ?  dic[char]! : startNum
                dic[char] = index
            } else {
                chars.append(char)
                dic[char] = index
            }
            maxLength = (index - startNum) > maxLength ? (index - startNum) : maxLength
        }
        return maxLength
        
    }
    
    // 减少存储的一种方式 存最后的string 遍历所有子类 获取最大值
    func lengthOfLongestSubstring2(_ s: String) -> Int {
        var subString: String = ""
        var maxLength = 0
        for char in s {
            let breakArray = subString.components(separatedBy: String(char))
            if breakArray.count > 1 {
                 subString = breakArray[1] +  String(char)
            } else {
                subString = subString + String(char)
            }
            maxLength = max(maxLength, subString.count)
        }
        return maxLength
    }
}

let soltion = Solution()
soltion.lengthOfLongestSubstring2("axcxxxxxa")
