/*
 给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 + 和 -。对于数组中的任意一个整数，你都可以从 + 或 -中选择一个符号添加在前面。
 
 返回可以使最终数组和为目标数 S 的所有添加符号的方法数。
 
 示例 1:
 
 输入: nums: [1, 1, 1, 1, 1], S: 3
 输出: 5
 解释:
 
 -1+1+1+1+1 = 3
 +1-1+1+1+1 = 3
 +1+1-1+1+1 = 3
 +1+1+1-1+1 = 3
 +1+1+1+1-1 = 3
 
 一共有5种方法让最终目标和为3。
 注意:
 
 数组的长度不会超过20，并且数组中的值全为正数。
 初始的数组的和不会超过1000。
 保证返回的最终结果为32位整数。
 */

import Foundation

// 需要简化问题 ，我们可以这样考虑 把正数集 与负数集分开 那么就有： 正数集 - 负数集 = 目标
// 两边加上总数。  那么久是  2 * 正数集合 = 目标 + 总和
// 那么问题就变成了  找到子集和等于 （目标 + 总和）/ 2

class Solution {
    func findTargetSumWays(_ nums: [Int], _ S: Int) -> Int {
        let sum = nums.reduce(0, +)
        guard sum >= S  && (sum + S) % 2 == 0 else {
            
            return 0
        }
        return subsetSum(nums, (sum + S)/2)
    }
    // 动态规划做 
    func subsetSum(_ nums: [Int], _ S: Int) -> Int {
        var dp = Array(repeating: 0, count: S + 1)
        dp[0] = 1
        for num in nums {
            var taget = S
            while taget >= num {
                dp[taget] += dp[taget - num];
                taget -= 1
            }
        }
        return dp[S]
    }
}
