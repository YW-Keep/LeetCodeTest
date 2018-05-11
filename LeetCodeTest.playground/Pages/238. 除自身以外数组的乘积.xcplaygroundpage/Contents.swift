/*
 给定长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。
 
 示例:
 
 输入: [1,2,3,4]
 输出: [24,12,8,6]
 说明: 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
 
 进阶：
 你可以在常数空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）
 */

// 思路 首先想到的是除法 额。不允许除法（估计怕0报错吧） 然后在想想，因为要除以本身，所以想到的是左右两边遍历（记录2遍的累乘数组），然后 后面说 不要额外空间，然后想到一个数累乘记录 直接乘上去就好了。

import Foundation

class Solution {
    func productExceptSelf(_ nums: [Int]) -> [Int] {
        guard nums.count > 0 else {
            return []
        }
        
        var  outNums = [1]
        var num = 1
        for index in 0...(nums.count - 1) {
            num = nums[index] * num
            outNums.append(num)
        }
        outNums.removeLast()
        num = 1
        for index in 0...(nums.count - 1) {
            outNums[nums.count - 1 - index] = outNums[nums.count - 1 - index] * num
            num = nums[nums.count - 1 - index] * num
        }
        
        return outNums
    }
}

