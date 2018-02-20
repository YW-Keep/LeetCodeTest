/*
 Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
 
 Example:
 
 Input: "babad"
 
 Output: "bab"
 
 Note: "aba" is also a valid answer.
 
 
 Example:
 
 Input: "cbbd"
 
 Output: "bb"
 // 这是最长回文子串 不是子序列（这个算法可以通过对程序优化，Manacher 算法，简单的说就是记录中心最大右边距，如果在边距内就可以通过对称性排除多余的计算次数把这个算法时间复杂度下降到O(n）级别， 详见方法2）
 */

import Foundation

class Solution {
    func longestPalindrome(_ s: String) -> String {
        
        guard s.count > 1 else {
            return s
        }
        
        // 插入特殊符号用作可以不用区分奇偶
        var newString: [String] = ["#"]
        for char in s {
            newString.append(String(char))
            newString.append("#")
        }
        
        var maxString = ""
        for(index, char) in newString.enumerated() {
            var  nowString = ""
            if String(char) != "#" {
                nowString = String(char)
            }
            var i = index - 1
            var j = index + 1
            while i > 0 && j < newString.count - 1 {
                if newString[i] == newString[j] {
                    if newString[i] != "#" {
                        nowString = newString[i] + nowString + newString[i]
                    }
                    i = i - 1
                    j = j + 1
                    
                } else
                {
                    break
                }
            }
            if nowString.count > maxString.count {
                maxString = nowString
            }
        }
        return maxString
    }
    
    func longestPalindrome2(_ s: String) -> String {
        
        guard s.count > 1 else {
            return s
        }
        
        // 插入特殊符号用作可以不用区分奇偶
        var newString: [String] = ["#"]
        for char in s {
            newString.append(String(char))
            newString.append("#")
        }
        
        
        var maxNum: [Int] = []
        var mid = 0
        var right = 0
        for(index, _) in newString.enumerated() {
            maxNum.append(0)
            let mirror = 2*mid - index
            if (right > index) {
                maxNum[index] = min(right - index, maxNum[mirror])
            }
            while ((index - maxNum[index] - 1) >= 0) && ((index + maxNum[index] + 1) < newString.count) {
                if newString[index - maxNum[index] - 1] == newString[index + maxNum[index] + 1] {
                    maxNum[index] = maxNum[index] + 1
                    if (index + maxNum[index]) > right {
                        mid = index
                        right = index + maxNum[index]
                    }
                } else {
                    break
                }
            }
        }
        var length = 0
        var center = 0
        for (index, num) in maxNum.enumerated() {
            if num > length {
                length = num
                center = index
            }
        }
        
        let start = s.index(s.startIndex, offsetBy: (center - length) / 2)
        let end = s.index(s.startIndex, offsetBy: (center  + length - 1) / 2)
        return String(s[start...end])
        
    }
}

