/*
 
 给定一个无序的整数数组，找到其中最长上升子序列的长度。
 
 示例:
 
 输入: [10,9,2,5,3,7,101,18]
 输出: 4
 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 说明:
 
 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
 你算法的时间复杂度应该为 O(n2) 。
 进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?
 */

import Foundation
// 动态规划 时间复杂度为O(n2)
class Solution {
    func lengthOfLIS(_ nums: [Int]) -> Int {
        guard nums.count > 0 else {
            return 0
        }
        guard nums.count > 1 else {
            return 1
        }
        var dp: [Int] = Array(repeating: 1, count: nums.count)
        var res = 1
        for i in 1...(nums.count - 1) {
            for j in 0...(i - 1) {
                if(nums[j] < nums[i]) {
                    dp[i] = max(dp[i], dp[j] + 1)
                }
            }
            res = max(res, dp[i])
        }
        return res
    }
}

// 动态规划 时间复杂度为 O(n log n)动态替换求最长的方式 (如果遍历到的新元素比ends数组中的首元素小的话，替换首元素为此新元素，如果遍历到的新元素比ends数组中的末尾元素还大的话，将此新元素添加到ends数组末尾(注意不覆盖原末尾元素)。如果遍历到的新元素比ends数组首元素大，比尾元素小时，此时用二分查找法找到第一个不小于此新元素的位置，覆盖掉位置的原来的数字，)
class Solution2 {
    func lengthOfLIS(_ nums: [Int]) -> Int {
        guard nums.count > 0 else {
            return 0
        }
        var heap = [nums[0]]
        for num in nums {
            if num > heap.last! {
                heap.append(num)
            } else if num < heap.first! {
                heap[0] = num
            }else {
                var left = 0, right = heap.count - 1
                while left < right {
                    let mid = (left + right)/2
                    if num > heap[mid] {
                        left = mid + 1
                    } else {
                        right = mid
                    }
                }
                heap[left] = num
            }
        }
        return heap.count
    }
}
