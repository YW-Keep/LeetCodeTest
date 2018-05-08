/*
 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 
 示例 1:
 
 输入: [3,2,1,5,6,4] 和 k = 2
 输出: 5
 示例 2:
 
 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 输出: 4
 说明:
 
 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
 */

import Foundation

// 超时
class Solution {
    func findKthLargest(_ nums: [Int], _ k: Int) -> Int {
        guard nums.count > 0 else {
            return 0
        }
        let num = nums[0]
        var maxNum: [Int] = []
        var minNum: [Int] = []
        for (index,inNum) in nums.enumerated() {
            guard index > 0 else {
                continue
            }
            if inNum > num {
                maxNum.append(inNum)
            } else {
                minNum.append(inNum)
            }
        }
        
        if maxNum.count == k - 1 {
            return num
        } else if maxNum.count > k - 1 {
            return findKthLargest(maxNum,k)
        } else {
            return findKthLargest(minNum, k - maxNum.count - 1)
        }
    }
}
// 通过 可以得出结论 nums.enumerated() 是先做的 所以增加了 时间
class Solution2 {
    func findKthLargest(_ nums: [Int], _ k: Int) -> Int {
        guard nums.count > 0 else {
            return 0
        }
        guard nums.count > 1 else {
            return nums[0]
        }
        let num = nums[0]
        var maxNum: [Int] = []
        var minNum: [Int] = []
        for index in 1...(nums.count - 1) {
            let inNum = nums[index]
            if inNum > num {
                maxNum.append(inNum)
            } else {
                minNum.append(inNum)
            }
        }
        if maxNum.count == k - 1 {
            return num
        } else if maxNum.count > k - 1 {
            return findKthLargest(maxNum,k)
        } else {
            return findKthLargest(minNum, k - maxNum.count - 1)
        }
    }
}
