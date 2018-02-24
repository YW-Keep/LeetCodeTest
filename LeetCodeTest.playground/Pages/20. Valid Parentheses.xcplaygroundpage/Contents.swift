/*
 
 Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 
 The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.
左括号入栈  右括号出站匹配 如果不匹配 直接报错 时间复杂度为o(n)
 */


import Foundation

class Solution {
    func isValid(_ s: String) -> Bool {
        let dic = [")" : "(", "}" : "{","]" : "["]
        var stack: [String] = []
        let letfArray = ["(","{","["]
        for char in s {
            if letfArray.contains(String(char)) {
                stack.append(String(char))
            } else {
                guard stack.count > 0 else {
                    return false
                }
                if stack.last! == dic[String(char)] {
                    stack.removeLast()
                } else {
                    return false
                }
            }
        }
        return stack.count > 0 ? false : true
    }
}
