/*
 Given an array of integers sorted in ascending order, find the starting and ending position of a given target value.
 
 Your algorithm's runtime complexity must be in the order of O(log n).
 
 If the target is not found in the array, return [-1, -1].
 
 For example,
 Given [5, 7, 7, 8, 8, 10] and target value 8,
 return [3, 4].
 */
import Foundation

class Solution {
    func searchRange(_ nums: [Int], _ target: Int) -> [Int] {
        
        func searchBorder(_ nums: [Int], _ target: Int, _ isleft: Bool) -> Int{
            var lo = 0
            var hi = nums.count
            while (lo < hi) {
                let mid = (lo + hi) / 2
                if nums[mid] > target || isleft && target == nums[mid] {
                    hi = mid
                } else {
                    lo = mid + 1
                }
            }
            return lo
        }
        
        let leftIdx = searchBorder(nums, target, true)
        if leftIdx == nums.count || nums[leftIdx] != target {
            return [-1, -1]
        }
        let rightIdx = searchBorder(nums, target, false)
        return [leftIdx, rightIdx - 1]
    }
}
