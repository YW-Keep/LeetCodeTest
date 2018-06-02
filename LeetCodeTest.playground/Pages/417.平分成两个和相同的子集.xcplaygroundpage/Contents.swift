/*
 给定一个只包含正整数的非空数组，如果数组可以被划分为两个子集，那么这两个子集中的元素之和是相等的。
 
 注意:
 每个数组元素都不会超过100。
 数组大小不会超过200。
 Example 1:
 
 Input: [1, 5, 11, 5]
 
 Output: true
 
 Explanation: The array can be partitioned as [1, 5, 5] and [11].
 Example 2:
 
 Input: [1, 2, 3, 5]
 
 Output: false
 
 Explanation: The array cannot be partitioned into equal sum subsets.
 */

import Foundation

// 其实是一个背包问题  最后用了动态规划区解决它
class Solution {
    func canPartition(_ nums: [Int]) -> Bool {
        guard nums.count > 1 else {
            return false
        }
        let sum = nums.reduce(0, +)
        guard sum%2 == 0 else {
            return false
        }
        let mid = sum / 2
        var record = Array(repeating: Array(repeating: 0 , count: mid + 1) , count: nums.count)
        guard nums[0] <= mid else {
            return false
        }
        for indx in nums[0]...mid {
            record[0][indx] = nums[0]
        }
        
        for i in 1...(nums.count - 1) {
            let nowNum = nums[i]
            guard nowNum <= mid else {
                return false
            }
            for j in nowNum...mid {
                record[i][j] = max(record[i-1][j], record[i-1][j-nowNum] + nums[i])
            }
        }
        if record[nums.count - 1][mid] == mid {
            return true
        } else {
            return false
        }
    }
}
