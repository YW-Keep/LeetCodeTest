/*
 Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.
 
 For "(()", the longest valid parentheses substring is "()", which has length = 2.
 
 Another example is ")()())", where the longest valid parentheses substring is "()()", which has length = 4.
  思路 1. 用数组记录每个（  堆栈的位置
  思路 2. 记录（ 与）的个数，当相等时 进行判断 （这需要左右遍历两次）
 */

import Foundation

class Solution {
    func longestValidParentheses(_ s: String) -> Int {
        var maxNum = 0
        var stack:[Int] = [-1]
        for (index, char) in s.enumerated() {
            if String(char) == "(" {
                stack.append(index)
            } else {
                stack.removeLast()
                if stack.count == 0 {
                    stack.append(index)
                }
                maxNum = max(maxNum, index - stack.last!)
            }
        }
        return maxNum
    }
}
