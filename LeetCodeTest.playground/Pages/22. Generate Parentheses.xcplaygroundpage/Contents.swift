/*
 Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 
 For example, given n = 3, a solution set is:
 
 [
 "((()))",
 "(()())",
 "(())()",
 "()(())",
 "()()()"
 ]
 二叉树遍历思想
 */

import Foundation

class Solution {
    func generateParenthesis(_ n: Int) -> [String] {
        var result: [String] = []
        add(ruslut: &result, cur: "", open: n, close: n)
        return result
    }
    func add(ruslut: inout [String], cur: String, open: Int, close: Int) {
        if(open == 0 && close == 0)  {
            ruslut.append(cur)
            return
        }
        if(open > 0) {
            add(ruslut: &ruslut, cur: cur + "(", open: open - 1, close: close)
        }
        if(close > 0 && close > open) {
            add(ruslut: &ruslut, cur: cur + ")", open: open, close: close - 1)
        }
    }
}
