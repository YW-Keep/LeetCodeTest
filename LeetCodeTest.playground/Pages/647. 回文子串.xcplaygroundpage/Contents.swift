/*
 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
 
 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被计为是不同的子串。
 
 示例 1:
 
 输入: "abc"
 输出: 3
 解释: 三个回文子串: "a", "b", "c".
 示例 2:
 
 输入: "aaa"
 输出: 6
 说明: 6个回文子串: "a", "a", "a", "aa", "aa", "aaa".
 注意:
 
 输入的字符串长度不会超过1000。
*/
import Foundation

var str = "Hello, playground"

// 第一个思路每一个点作为分割判断回文 往外扩散 但是超时了 我们可以想象时间复杂度很高 而且有很多重复计算
// 其实回文就该想到一个经典算法Manacher算法（中文名：马拉车算法）
class Solution {
    func countSubstrings(_ s: String) -> Int {
        guard s.count > 0 else {
            return 0
        }
        var reslut = 0
        let count = s.count
        for index in 0...(count - 1)*2 {
            var left: Int = index / 2
            var right: Int =  left + index % 2
            while left >= 0 && right < count && getString(s, left) == getString(s, right) {
                reslut += 1
                left -= 1
                right += 1
            }
        }
        return reslut;
    }
    
    func getString(_ s: String,_ num: Int) -> Character {
        let index = s.index(s.startIndex, offsetBy: num)
        return s[index]
    }
    
    // 马拉车算法
    func countSubstrings2(_ s: String) -> Int {
        
        guard s.count > 1 else {
            return s.count
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
        for index in 0...(newString.count - 1) {
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
        var result = 0
        for num in maxNum {
            result = result + (num + 1) / 2
        }
        return result
        
    }
}
