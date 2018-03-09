/*
 Given a set of candidate numbers (C) (without duplicates) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.
 
 The same repeated number may be chosen from C unlimited number of times.
 Note:
 All numbers (including target) will be positive integers.
 The solution set must not contain duplicate combinations.
 For example, given candidate set [2, 3, 6, 7] and target 7,
 A solution set is:
 [
 [7],
 [2, 2, 3]
 ]
 */

import Foundation

class Solution {
    func combinationSum(_ candidates: [Int], _ target: Int) -> [[Int]] {
        guard candidates.count > 0 else {
            return []
        }
        var result: [[Int]] = []
        dfs(start: 0, sum: 0, targert: target, candidates: candidates, ans: [], result: &result)
        return result
    }
    
    func dfs(start: Int, sum: Int, targert: Int, candidates: [Int], ans: [Int], result: inout [[Int]]) {
        
        if(sum == targert) {
            result.append(ans)
        } else if(sum > targert) {
            return
        } else {
            for i in start ..< candidates.count {
                // 重复数字去重
                if i > 0 &&  candidates[i] ==  candidates[i - 1] {
                    continue
                }
                let newSum = sum + candidates[i]
                let newAns = ans + [candidates[i]]
                dfs(start: i, sum: newSum, targert: targert, candidates: candidates, ans: newAns, result: &result)
            }
        }
    }
}
