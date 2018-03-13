/*
 
 Given a collection of distinct numbers, return all possible permutations.
 
 For example,
 [1,2,3] have the following permutations:
 [
 [1,2,3],
 [1,3,2],
 [2,1,3],
 [2,3,1],
 [3,1,2],
 [3,2,1]
 ]
 */
import Foundation

class Solution {
    func permute(_ nums: [Int]) -> [[Int]] {
        var result: [[Int]] = []
        guard nums.count > 1 else {
            if nums.count == 0 {
                return result
            } else {
                result.append(nums)
                return result
            }
        }
        dfs(nums: nums, ans: [], result: &result)
        return result
    }
    func dfs(nums: [Int], ans: [Int], result: inout [[Int]]) {
        guard nums.count > 1 else {
            result.append((ans + nums))
            return
        }
        for (index, value) in nums.enumerated() {
            var newArray = nums
            newArray.remove(at: index)
            let newAns = ans + [value]
            dfs(nums: newArray, ans: newAns, result: &result)
        }
    }
}
