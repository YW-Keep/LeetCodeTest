/*
 给定一个经过编码的字符串，返回它解码后的字符串。
 
 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 
 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 
 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 
 示例:
 
 s = "3[a]2[bc]", 返回 "aaabcbc".
 s = "3[a2[c]]", 返回 "accaccacc".
 s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".
 */


import Foundation

// 思路 堆栈
class Solution {
    func decodeString(_ s: String) -> String {
        var heap: [String] = []
        for char in s {
            let str = String(char)
            if str == "]" {
                var inStr = ""
                while heap.last! != "["  {
                    inStr = heap.last! + inStr
                    heap.removeLast()
                }
                heap.removeLast()
                var numStr = ""
                while heap.last != nil && isNum(numString: heap.last!) {
                    numStr = heap.last! + numStr
                    heap.removeLast()
                }
                let num = Int(numStr) ?? 1
                var lastStr = ""
                for _ in  0...(num - 1) {
                    lastStr = inStr + lastStr
                }
                heap.append(lastStr)
            } else {
                heap.append(str)
            }
        }
        var reslut = ""
        for inString in heap {
            reslut = reslut + inString
        }
        return reslut
    }
    func isNum(numString: String) -> Bool {
        let num = "1234567890"
        return num.contains(numString)
    }
}
