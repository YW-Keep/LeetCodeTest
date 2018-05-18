/*
 
 给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间，包括 1 和 n ，可知至少存在一个重复的整数。假设只有一个重复的整数，找出这个重复的数。
 
 示例 1:
 
 输入: [1,3,4,2,2]
 输出: 2
 示例 2:
 
 输入: [3,1,3,4,2]
 输出: 3
 说明：
 
 不能更改原数组（假设数组是只读的）。
 只能使用额外的 O(1) 的空间。
 时间复杂度小于 O(n2) 。
 数组中只有一个重复的数字，但它可能不止重复出现一次。
 */

import Foundation
// 暴力查找 时间复杂度 O(n2) 字典存储 空间复杂度O(n) 归并排序 破坏数组结构  只能二分查找了 这个时间复杂度是nlog(n) 还有一种循环快慢指针的方式 时间复杂度是n  简单介绍下思路，如果没有重复的数是不会出现循环的，因为有重复的数会导致数字圈这样，快慢指针会相遇，相遇时快指针比慢指针多走了没进循环前的距离,而进循环的点就是重复点，这时候会在还差这个距离到重复点的地方快慢指针相遇，这时候再一个指针与慢指针一起跑就好了，会正好在重复点相遇，时间复杂度就是N

class Solution {
    func findDuplicate(_ nums: [Int]) -> Int {
        var min = 1, max = nums.count - 1
        while min < max {
            let mid = (max + min) / 2
            var minNum  = 0
            for num in nums {
                if num <= mid {
                    minNum += 1
                }
            }
            if minNum <= mid {
                min = mid + 1
            } else {
                max = mid
            }
        }
        return min
    }
}

class Solution2 {
    func findDuplicate(_ nums: [Int]) -> Int {
        var slow = 0, fast = 0
        repeat {
            slow = nums[slow]
            fast = nums[nums[fast]]
        } while slow != fast
        var find = 0
        while find != slow {
            slow = nums[slow]
            find = nums[find]
        }
        return find
    }
}

